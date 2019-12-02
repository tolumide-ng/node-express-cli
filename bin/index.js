#!/usr/bin/env node

const fs = require("fs");
const { exec } = require("child_process");
const [, , ...args] = process.argv;
const helpers = require("../lib/template");
const init = require('../lib/init')

if (args[0] === "init") {
	// run init function
   init();
}
