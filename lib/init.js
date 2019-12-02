const { interactive, questionsArr } = require('./utils');
const generateFiles = require('./generateFiles');

const init = () => {
const interact = new interactive(questionsArr);
interact.getInfo();
interact.on('done', data => {
    generateFiles(data);
})
};


module.exports = init;