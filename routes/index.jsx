import { parse } from "https://deno.land/std@0.180.0/encoding/csv.ts";

export const handler = {
  async GET(req, ctx) {
    const data = await Deno.readTextFile("boring.csv");
    const borings = parse(data, { skipFirstRow: true });
    return ctx.render({ borings });
  }
}

export default function({ data }) {
  const { borings } = data;
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossorigin=""
      ></script>
      <script type="module" src="index.js"></script>

      <div
        id="map"
        class="w-full h-64"
        data-borings={JSON.stringify(borings)}
      ></div>

      <div class="flex justify-center gap-4 p-4">
        <div class="border border-black p-2 bg-white rounded shadow-md w-72">
          <div>
            <input type="checkbox"/>非表示
          </div>
          <div>
            <input type="checkbox"/>孔口標高
            <input class="border border-black"/>（m）
          </div>
          <div>
            <input type="checkbox"/>総削孔長(総掘進長)
            <input class="border border-black"/>（m）
          </div>
          <div>
            <input type="checkbox"/>PDFファイル
          </div>
          <div>
            <input type="checkbox"/>
            標準貫入試験(N値)
          </div>
          <div>
            <input type="checkbox"/>孔内水位
            <input class="border border-black"/>（m）
          </div>
          <div>
            <input type="checkbox"/>速度検層
          </div>
          <div>
            <input type="checkbox"/>孔内(水平)載荷試験
          </div>
          <div>
            <input type="checkbox"/>透水試験
          </div>
          <div>
            <input type="checkbox"/>その他原位置試験（電気検層も含む）
          </div>
          <div>
            <input type="checkbox"/>試料採取
          </div>
          <div>
            <input type="checkbox"/>地質時代・地層岩体区分
          </div>
          <div>
            <input type="submit" value="検索" class="border border-black p-2 mx-auto block mt-10 rounded"/>
          </div>
        </div>

        <div class="border border-black p-2 bg-white rounded shadow-md w-72">
          <ul id="dllist"></ul>
          <input type="submit" class="border border-black p-2 mx-auto block rounded" value="ダウンロード"/>
        </div>

      </div>
    </>
  );
}
