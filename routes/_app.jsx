import { Head } from "$fresh/runtime.ts";

export default function({ Component }) {
  return (
    <>
      <Head>
        <title>福井地盤データダウンロードセンター</title>
      </Head>
      <div class="px-8 bg-gray-200">
        <header class="p-4 text-center text-4xl">
          福井地盤データダウンロードセンター
        </header>
        <Component/>
        <footer class="h-16"></footer>
      </div>
    </>
  );
}

