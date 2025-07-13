import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/main.jsx"],
    bundle: true,
    outfile: "dist/bundle.js",
    format: "esm",
    sourcemap: true,
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
    },
  })
  .then(() => {
    console.log("Build complete");
  })
  .catch(() => process.exit(1));
