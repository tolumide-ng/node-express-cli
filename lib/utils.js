const readline = require('readline');
const events = require('events');
const fs = require('fs');

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
        if (answer.toUpperCase() === 'D') {
          this._count = this.questions.length;
        } else this.projectInfo[this.questions[this._count++].key] = answer;

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

const writeFile = (path, data, sync = false) => {
  if (sync) {
    fs.writeFileSync(path, data, { flag: 'w' });
  }
  fs.writeFile(path, data, { flag: 'w' }, err => {
    if (err) throw err;
  });
};

const checkWriteFile = (path, name, dataStr, sync = false) => {
  if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err, data) => {
      if (err) throw err;
      writeFile(`${path}/${name}`, dataStr, sync);
    });
  } else {
    writeFile(`${path}/${name}`, dataStr, sync);
  }
};

module.exports = {
  interactive,
  questionsArr,
  writeFile,
  checkWriteFile,
};
