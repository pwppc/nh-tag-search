const outFile = "nh-tag-search.user.js";
const outdir = "dist";
const outFilePath = `${outdir}/${outFile}`;

await Bun.build({
  entrypoints: ["./src/main.ts"],
  outdir: outdir,
  naming: outFile,
  target: "browser",
  minify: true,
});

const scriptMetadata: Record<string, string> = {
  name: "NH Search Helper",
  namespace: "http://tampermonkey.net/",
  version: "0.1",
  description: "try to take over the world!",
  author: "You",
  match: "https://nhentai.net/*",
  grant: "none",
};

const metadataString = Object.entries(scriptMetadata)
  .map(([key, value]) => `// @${key} ${value}`)
  .join("\n");

const finalMetadataString = `// ==UserScript==\n${metadataString}\n// ==/UserScript==\n`;
const outputFile = Bun.file(outFilePath);
const outputFileText = await outputFile.text();

Bun.write(outputFile, finalMetadataString + outputFileText);
