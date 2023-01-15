import { c_Calculator } from "./calculator";

const secret = "predefined_secretword";
const node_modules = "node_modules";

export default function main() {
  const l_calculator = new c_Calculator();
  const l_results = l_calculator.f_sum(2, 3);

  /* predefined_secretword -> 123456 : defined in predefinedWords inside webpack.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignoredWords inside webpack.config.js */
  console.log("node_modules:", node_modules);

  /* l_results -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", l_results);
}

main();
