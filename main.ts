import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.179.0/http/file_server.ts";
import {
  Params,
  renderFileToString,
} from "https://deno.land/x/dejs@0.10.3/mod.ts";
import { parse } from "https://deno.land/std@0.180.0/encoding/csv.ts";

async function renderPage(tpl: string, params: Params = {}) {
  const body = await renderFileToString(`${Deno.cwd()}/${tpl}`, params);
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
}

async function index() {
  const data = await Deno.readTextFile("boring.csv");
  const csv = parse(data, { skipFirstRow: true });
  const borings = csv;
  return { borings };
}

async function handler(req: Request) {
  const { pathname } = new URL(req.url);
  const path = `${req.method} ${pathname}`;

  switch (path) {
    case "GET /":
      return renderPage("index.ejs", await index());
  }
  return serveDir(req, { fsRoot: "./static/" });
}

serve(handler);
