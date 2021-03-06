import path from "path";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import reactSvg from "rollup-plugin-react-svg";
import { minifyHTML } from "rollup-plugin-minify-html";

const ENV = process.env.NODE_ENV || "development";

const production = ENV === "production";

const serve = () => {
	let server;

	const toExit = () => {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn("yarn", ["start"], {
				stdio: ["ignore", "inherit", "inherit"],
				shell: true
			});

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		}
	};
}

export default [{
	input: path.resolve(__dirname, "public", "sw.js"),
	output: {
		file: path.resolve(__dirname, "dist", "sw.js"),
		format: "iife"
	},
	plugins: [
		resolve({
			extensions: [".js"],
			browser: true
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify(ENV)
		}),
		babel({
			babelHelpers: "bundled",
			babelrc: false,
			exclude: [/\/core-js\//],
			presets: [
					[
					"@babel/preset-env",
					{
						modules: false,
						useBuiltIns: "usage",
						corejs: 3
					}
				]
			]
		}),
		commonjs(),
		production && terser(),
		minifyHTML({
			targets: [
				{
					src: "public/index.html",
					dest: "dist/index.html",
					minifierOptions: {
						collapseWhitespace: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: true
					}
				}
			]
		})
	]
}, {
	input: path.resolve(__dirname, "src", "index.js"),
	external: ["react", "react-dom"],
	output: {
		file: path.resolve(__dirname, "dist", "bundle.js"),
		format: "iife",
		globals: {
			"react": "React",
			"react-dom": "ReactDOM"
		}
	},
	plugins: [
		copy({
			targets: [
				{
					src: path.resolve(__dirname, "public", "**"),
					dest: path.resolve(__dirname, "dist"),
					ignore: [
						path.resolve(__dirname, "public", "index.html"),
						path.resolve(__dirname, "public", "sw.js"),
						path.resolve(__dirname, "public", "assets")
					]
				},
				{
					src: path.resolve(__dirname, "public", "assets", "**"),
					dest: path.resolve(__dirname, "dist", "assets")
				}
			]
		}),
		resolve({
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			browser: true
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify(ENV),
			"COVID_19_API": JSON.stringify("https://covid19.mathdro.id/api")
		}),
		alias({
			entries: [
				{ find: "@", replacement: path.resolve(__dirname, "src") }
			]
		}),
		babel({
			babelHelpers: "bundled",
			exclude: "node_modules/**"
		}),
		commonjs(),
		globals(),
		builtins(),
		json(),
		postcss({
			minimize: production,
			config: {
				path: path.resolve(__dirname, "postcss.config.js")
			},
			extensions: [".css", ".scss"],
			extract: path.resolve(__dirname, "dist", "style.css")
		}),
		reactSvg(),
		!production && process.env.ROLLUP_WATCH && serve(),
		!production && process.env.ROLLUP_WATCH && livereload("dist"),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}];
