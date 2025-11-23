import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "root"),
    clean: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, "root"),
    port: 4000,
    open: true,
    hot: true,
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin(),
    ],
  },
};
