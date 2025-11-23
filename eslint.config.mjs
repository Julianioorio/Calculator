import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], languageOptions: { globals: globals.browser }, ignores: ["root/**"], },
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"], ignores: ["root/**"], },
	
]);