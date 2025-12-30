import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-n8n-api-key",
};

// 產生 slug：小寫、空白變 -、移除特殊符號，最後加一段隨機碼避免重複
function makeSlug(title: string): string {
  if (!title) return crypto.randomUUID(); // 保底

  let slug = title.toLowerCase().trim();

  // 空白 → -
  slug = slug.replace(/\s+/g, "-");

  // 僅保留英數、-、_（如果你想包含中文，可以改這行）
  // slug = slug.replace(/[^a-z0-9-_]/g, "");

  // 合併多個 -，去掉頭尾 -
  slug = slug.replace(/-+/g, "-").replace(/^-+|-+$/g, "");

  // 隨機碼（用 UUID 截一段）
  const rand = crypto.randomUUID().slice(0, 7); // 例如 mji1v5fp[web:67][web:80]

  return slug ? `${slug}-${rand}` : rand;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 🔐 驗證 n8n API Key
    const n8nApiKey = Deno.env.get("N8N_API_KEY_ROBERT_HUT");
    const providedApiKey = req.headers.get("x-n8n-api-key");

    if (!n8nApiKey) {
      console.error("N8N_API_KEY_ROBERT_HUT not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!providedApiKey || providedApiKey !== n8nApiKey) {
      console.error("Invalid API key");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("✅ API key validated");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🚫 檔案大小限制 (10MB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "Payload too large (max 10MB)" }),
        {
          status: 413,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Parse multipart form data
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slugInput = formData.get("slug") as string | null;
    let content = formData.get("content") as string;
    let excerpt = (formData.get("excerpt") as string) || "";
    const tagsString = (formData.get("tags") as string) || "";
    const imageFile = formData.get("image") as File | null;

    console.log("📥 Form data received:", {
      title: title?.substring(0, 50),
      hasImage: !!imageFile,
    });

    // 必要欄位驗證
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Convert literal \n strings to actual newlines
    content = content.replace(/\\n/g, "\n");
    excerpt = excerpt.replace(/\\n/g, "\n");

    // 📁 圖片上傳到 roberthut-blog-images 儲存桶
    let coverImageUrl = "/placeholder.svg";
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ Uploading image:", imageFile.name, imageFile.size);

      const fileExt = imageFile.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("roberthut-blog-images")
        .upload(fileName, imageFile, {
          contentType: imageFile.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ Image upload error:", uploadError);
        return new Response(
          JSON.stringify({
            error: "Failed to upload image",
            details: uploadError.message,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // 取得公開 URL
      const { data: urlData } = supabase.storage
        .from("roberthut-blog-images")
        .getPublicUrl(fileName);

      coverImageUrl = urlData.publicUrl;
      console.log("✅ Image uploaded:", coverImageUrl);
    }

    // Parse tags (array or empty)
    const tags = tagsString
      ? tagsString.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    // 🔧 自動生成 slug（若 n8n 沒傳或為空字串，就用標題自動產生）
    const finalSlug =
      slugInput && slugInput.trim() !== "" ? slugInput : makeSlug(title);

    console.log("📝 Inserting post:", {
      title: title.substring(0, 30),
      slug: finalSlug,
      hasImage: coverImageUrl !== "/placeholder.svg",
    });

    // 🚀 插入到 roberthut_posts 資料表
    const { data: post, error: insertError } = await supabase
      .from("roberthut_posts")
      .insert({
        title,
        slug: finalSlug,
        content,
        excerpt,
        cover_image_url: coverImageUrl,
        tags,
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Insert error:", insertError);
      return new Response(
        JSON.stringify({
          error: "Failed to create post",
          details: insertError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("🎉 Post created successfully:", post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("💥 Unexpected error:", error);
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
