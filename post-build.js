import { minify } from "html-minifier-terser";
import fs from "fs";
import path from "path";

const distPath = path.resolve("dist/index.html");

// Leer el HTML generado
fs.readFile(distPath, "utf8", async (err, data) => {
  if (err) throw err;

  // Aplicar minificación avanzada
  const minifiedHtml = await minify(data, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  });

  // Escribir el HTML minificado en el archivo original
  fs.writeFile(distPath, minifiedHtml, (err) => {
    if (err) throw err;
    console.log("✅ HTML minificado y ofuscado.");
  });
});
