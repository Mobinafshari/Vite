import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/main.jsx"],
    bundle: true,
    outfile: "dist/bundle.js",
    format: "esm",
    sourcemap: true,
    jsx: "automatic",
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ".css": "css",
    },
  })
  .then(() => {
    console.log("Preparing Project to start...");
  })
  .catch(() => process.exit(1));
