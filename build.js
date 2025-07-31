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
  .then((data) => {
    console.log("Preparing Project to start..." , data);
  })
  .catch(() => process.exit(1));
