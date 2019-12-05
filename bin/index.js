#!/usr/bin/env node
const [, , ...args] = process.argv;
const init = require('../lib/init')

if (args[0] === "init") {
	// run init function
   init(args[1]);
}
