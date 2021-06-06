const sass = require("node-sass");
const fs = require("fs");

console.log("Compiling ...");

const result = sass.renderSync({
	file: "public/assets/styles/main.scss",
	sourceMap: true,
	outFile: "main.css",
});

fs.writeFile("public/assets/styles/main.css", result.css.toString(), { flag: "w+" }, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("Compiled succesfully! (public/assets/styles/main.scss => public/assets/styles/main.css)");
});
