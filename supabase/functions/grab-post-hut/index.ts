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

  const { data, error } = await supabase
    .from("roberthut_posts")
    .select("slug, title, content, excerpt, tags, translate")
    .eq("translate", "yes")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle(); // 查不到時 data = null, error = null [web:64]

  // 真正查詢錯誤（SQL / 權限等）才回 500
  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // 沒有任何 translate = "yes" 的資料 → 不當成錯誤，status 200
  if (!data) {
    return new Response(
      JSON.stringify({
        success: false,
        reason: "no_post_to_translate",
        post: null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // 有找到一筆
  return new Response(
    JSON.stringify({
      success: true,
      post: data,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
