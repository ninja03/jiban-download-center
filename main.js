import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.179.0/http/file_server.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.10.3/mod.ts";
import { parse } from "https://deno.land/std@0.79.0/encoding/csv.ts";

const renderPage = async (tpl, params) => {
  const body = await renderFileToString(`${Deno.cwd()}/${tpl}`, params);
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
};

serve(async (req) => {
  const { pathname } = new URL(req.url);
  const path = `${req.method} ${pathname}`;
  const router = new Map();
  router.set("GET /", async () => {
    const data = await Deno.readTextFile("boring.csv");
    const csv = await parse(data, { skipFirstRow: true });
    const borings = csv;
    return await renderPage("index.ejs", { borings });
  });
  const handler = router.get(path);
  if (handler) {
    return await handler();
  }
  return serveDir(req, { fsRoot: "./static/" });
});
