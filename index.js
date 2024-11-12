#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
 

const program = new Command();
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'please provide course title',
    },
    {
        type: 'number',
        name: 'price',
        message: 'please provide course price',
    },
]

const filePath = './courses.json';

program
  .name('courses-manager')
  .description('CLI to make courses')
  .version('1.0.0');

program
  .command('add')
  .alias('a')
  .description('Add a courses')
  .action((param, option) => {

    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers)
        if(fs.existsSync(filePath)){
            fs.readFile(filePath, 'uft8', (error, fileContent)=> {
                if(error){
                    console.log("Error:", error);
                    process.exit();
                } 
                console.log("fileContent: ", fileContent)
                const fileContentAsJson = JSON.parse(fileContent);
                fileContentAsJson.push(answers);
                fs.writeFile(filePath, JSON.stringify(fileContentAsJson) , 'utf8', ()=>{
                    console.log('Add courses done!');
                } )

            })  
        } else{
            fs.writeFile(filePath, JSON.stringify([answers]), 'utf8', ()=>{
                console.log('Add courses done!');
            } )
        }
    })
    // .catch((error) => {
    //     if (error.isTtyError) {
    //     // Prompt couldn't be rendered in the current environment
    //     } else {
    //     // Something else went wrong
    //     }
    // });

  });

  program
  .command('list')
  .alias('l')
  .description('List all courses')
  .action(() => {
    fs.readFile(filePath, 'utf-8', (error, content) => {
        if(error){
            console.log("Error: ", error);
            process.exit();
        }
        console.table(JSON.parse(content))
    })
  });

  program.parse(process.argv);