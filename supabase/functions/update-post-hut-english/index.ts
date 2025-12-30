import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-n8n-api-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // x-n8n-api-key 驗證
  const n8nApiKey = Deno.env.get("N8N_API_KEY_ROBERT_HUT");
  const providedApiKey = req.headers.get("x-n8n-api-key");
  if (!n8nApiKey || providedApiKey !== n8nApiKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 讀 JSON
  const body = await req.json();
  const slug = (body.slug ?? "").toString().trim();

  if (!slug) {
    return new Response(JSON.stringify({ error: "slug is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // eng_tags 建議 n8n 直接傳陣列，例如 ["ai","news"]
  //const eng_tags = Array.isArray(body.eng_tags)
  //  ? body.eng_tags.map((t: unknown) => String(t).trim()).filter(Boolean)
  //  : null;
  const eng_tags =
  Array.isArray(body.eng_tags)
    ? body.eng_tags
    : typeof body.eng_tags === "string"
      ? body.eng_tags.replace(/^=/, "").split(",").map(t => t.trim()).filter(Boolean)
      : null;
      
  // 更新（只更新你要的四個欄位）
  const { data, error } = await supabase
    .from("roberthut_posts")
    .update({
      eng_title: body.eng_title ?? null,
      eng_content: body.eng_content ?? null,
      eng_excerpt: body.eng_excerpt ?? null,
      // add update translate
      translate: body.translate ?? null,
      eng_tags,
    })
    .eq("slug", slug)
    .select()
    .single();

  // update 預設不回傳資料，所以鏈上 .select() 才會回傳更新後那筆 [web:87]
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true, post: data }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
