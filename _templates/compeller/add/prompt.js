// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'directory',
    message: 'Where to store the openapi?',
    initial: 'src',
  },
  {
    type: 'input',
    name: 'path',
    message: 'Fully qualified path e.g. /v1/user',
  },
  {
    type: 'select',
    name: 'method',
    choices: ['get', 'put', 'post', 'delete'],
  },
];
