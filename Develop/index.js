// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.error('Please enter a title.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'gHUsername',
        message: 'What is your GitHub username?',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.error('Please enter your GitHub username.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.error('Please enter your email address.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'what',
        message: 'Please describe your project and what problem it will solve',
        validate: whatInput => {
            if (whatInput) {
                return true;
            } else {
                console.error('Please enter a description of your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide instructions and examples for use',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.error('Please enter examples of use.');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'installation',
        message: 'Please provide step-by-step installation instructions for your project.',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.error('Please provide installation instructions.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'Please provide guidelines for contributing to your project.',
        validate: contributeInput => {
            if (contributeInput) {
                return true;
            } else {
                console.error('Please provide guidelines for contributing.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide instructions on how to test your project.',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.error('Please provide instructions on how to test your project.');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license will you use for your project?',
        choices: ['IBM', 'MIT', 'Apache', 'No license']
    },


];

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./read/created-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'A new README file has been created!'
            })
        })
    })
};

const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData
    })
}

init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err=> {
    console.log(err);
})