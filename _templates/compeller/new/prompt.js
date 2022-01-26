// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'title',
    message: 'API Title?',
    initial: 'New API generated with compeller',
  },
  {
    type: 'input',
    name: 'directory',
    message: 'Where to store the openapi?',
    initial: 'src',
  },
];
