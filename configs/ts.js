import eslintConfigPrettier from "eslint-config-prettier/flat";

import common from "../lib/common.js";
import typescript from "../lib/typescript.js";

export default [...common, ...typescript, eslintConfigPrettier];
