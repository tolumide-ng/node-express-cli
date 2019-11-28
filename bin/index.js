#!/usr/bin/env node

const fs = require("fs");
const { exec } = require("child_process");
const [, , ...args] = process.argv;
const helpers = require("../lib");
// import {
// 	generatePackageJson,
// 	generateBabel,
// 	generateGitIgnore,
// 	generateDotEnv,
// } from "../lib";

if (args[0] === "init") {
	// run init function
	const projectInfo = {
		name: "",
		description: "",
		author: "",
	};
	const generatePackage = project => {
		const data = helpers.generatePackageJson(project);
		const babel = helpers.generateBabel();
		const dotenv = helpers.generateDotEnv();
		const gitignore = helpers.generateGitIgnore();
		fs.writeFileSync("package.json", data, {
			flag: "w",
		});
		fs.writeFileSync(".babelrc", babel, {
			flag: "w",
		});
		fs.writeFileSync(".env", dotenv, {
			flag: "w",
		});
		fs.writeFileSync(".env.sample", dotenv, {
			flag: "w",
		});
		fs.writeFileSync(".env.sample", gitignore, {
			flag: "w",
		});
	};

	const readline = require("readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question("Project name:  ", answer => {
		projectInfo.name = answer;
		rl.question("Give a brief description? ", answer => {
			projectInfo.description = answer;
			rl.question("Author(s): ", answer => {
				rl.close();
				projectInfo.author = answer;
				generatePackage(projectInfo);
				console.log(`installing....`);
				exec(
					"npm i express",
					{ cwd: process.cwd() },
					(error, stdout, stderr) => {
						if (error) {
							console.error(`exec error: ${error}`);
							return;
						}
						console.error(`output: ${stdout}`);
					}
				);
			});
		});
	});
}
