#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const events = require('events');
const { exec } = require('child_process');
const [, , ...args] = process.argv;


const questionsArr = [
  {
    question: 'Project name (Enter D to use default settings): ',
    key: 'name',
  },
  {
    question: 'Description (Enter D to use default settings): ',
    key: 'description',
  },
  {
    question: 'Author(s) (Enter D to use default settings): ',
    key: 'author',
  },
  {
    question: 'Root dir of the project (Enter D to use default settings): ',
    key: 'root',
  },
];

class interactive extends events.EventEmitter {
  constructor(questions) {
    super();
    this.questions = questions;
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this._count = 0;
    this.projectInfo = {
      name: '',
      description: '',
      author: '',
      root: 'src',
    };
  }
 
  getInfo() {
    this.on('getQuest', data => {
      this.interface.question(data, answer => {
        this.projectInfo[this.questions[this._count++].key] = answer;
        if(answer.toUpperCase() === 'D') {
            this._count = this.questions.length;
        }
        if (this.questions[this._count]) {
          this.emit('getQuest', this.questions[this._count].question);
        } else {
          this.interface.close();
          this.emit('done', this.projectInfo);
        }
      });
    });

    this.emit('getQuest', this.questions[this._count].question);
  }
}

const read = new interactive(questionsArr);
read.getInfo();
read.on('done', data => {
    console.log({ data })
})

module.exports = {
    interactive,
    questionsArr
}
// const projSetup = {};

// read.on('getQuest', data => {
//   read.interface.question(data, answer => {
//     projSetup[questionsArr[count++].key] = answer;
//     if (questionsArr[count]) {
//       read.emit('getQuest', questionsArr[count].question);
//     } else {
//       console.log({ projSetup });
//       read.interface.close();
//     }
//   });
// });

// read.emit('getQuest', questionsArr[count].question);

// if(args[0] === 'init') {
//     // run init function
//     const projectInfo = {
//         name: '',
//         description: '',
//         author: '',
//       };

//       const generatePackage = project => {
//         const data = `{
//           "name": "${project.name}",
//           "version": "1.0.0",
//           "description": "${project.description}",
//           "author": "${project.author}",
//           "license": "MIT",
//           "scripts": {
//             "start": "babel-node server/index"
//           }
//         }
//       `;
//         fs.writeFileSync('package.json', data, {
//           flag: 'w',
//         });
//         fs.writeFileSync('.babelrc', babeldata, {
//             flag: 'w',
//           })

//       };

//       const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//       });

//       class interactive extends events.EventEmitter {
//           constructor () {
//              this.interface = readline.createInterface({
//                 input: process.stdin,
//                 output: process.stdout,
//               });
//           }
//       }

//       const readInterface = new interactive();

//       readInterface.on('write', (data) => {
//           readInterface.question(data, answer => {
//               console.log(answer);

//            readInterface.emit('write', 'your question');
//           })
//       })
//     //   rl.question('Project name:  ', answer => {
//     //     projectInfo.name = answer;
//     //     rl.question('Give a brief description? ', answer => {
//     //       projectInfo.description = answer;
//     //       rl.question('Author(s): ', answer => {
//     //         rl.close();
//     //         projectInfo.author = answer;
//     //         generatePackage(projectInfo);
//     //         console.log(`installing....`);
//     //         exec('npm i express', {cwd: process.cwd()} ,(error, stdout, stderr) => {
//     //           if (error) {
//     //             console.error(`exec error: ${error}`);
//     //             return;
//     //           }
//     //           console.error(`output: ${stdout}`);
//     //         });
//     //       });
//     //     });
//     //   });

// }

// npm i express babel
