import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  // Cambiar la entrada principal a tu app.js
  entry: {
    main: "./src/scripts/app.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',  // Inyecta CSS en el DOM
          'css-loader',    // Interpreta @import, url(), etc.
          'postcss-loader', // Opcional: para procesamiento adicional como autoprefixer
          'stylus-loader'  // Compila Stylus a CSS
        ]
      },
      // Regla para SVG
      {
        test: /\.svg$/,
        type: "asset"
      },
      // Regla para JS con SWC para ofuscación
      {
        test: /\.js$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript"
                },
                minify: {
                  compress: true,
                  mangle: true,
                },
              },
              env: { targets }
            }
          }
        ]
      },
      // Regla para CSS
      {
        test: /\.css$/,
        type: "css",
        use: ["style-loader", "css-loader"]
      },
      // Regla para imágenes - optimización de recursos
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb - imágenes menores se convierten a base64
          },
        },
        generator: {
          filename: 'assets/images/[name].[hash][ext]'
        }
      },
      // Regla para videos y otros multimedia
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: 'assets/media/[name].[hash][ext]'
        }
      },
      // Regla para fuentes
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    // Plugin para HTML
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
      minify: true
    }),
    // Plugin para copiar carpeta de imágenes
    new rspack.CopyRspackPlugin({
      patterns: [
        { from: 'public/img', to: 'assets/images' },
      ],
    }),
  ],
  optimization: {
    // Para minificación y optimización
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      // Minificador JS con SWC
      new rspack.SwcJsMinimizerRspackPlugin({
        compress: true,
        mangle: true
      }),
      // Minificador CSS con LightningCSS
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }
      }),
    ]
  },
  experiments: {
    css: true
  }
});