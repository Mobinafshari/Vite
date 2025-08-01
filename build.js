import esbuild from "esbuild";
import fs from "fs/promises";

esbuild
  .build({
    entryPoints: ["src/main.jsx"],
    outdir: "dist",
    bundle: true,
    splitting: true,
    format: "esm",
    sourcemap: true,
    jsx: "automatic",
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ".css": "css",
    },
    metafile: true,
    entryNames: "[name]-[hash]",
    chunkNames: "chunks/[name]-[hash]",
  })
  .then(async (result) => {
    console.log("✅ Project built with code splitting");
    await fs.writeFile("meta.json", JSON.stringify(result.metafile, null, 2));
  })
  .catch(() => process.exit(1));
