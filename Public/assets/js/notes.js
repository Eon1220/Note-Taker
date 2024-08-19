const notes = require('express').Router();
const fs = require('fs');


const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');



notes.get('/', (req, res) => {
    console.log('Requrest recieved for notes');
    readFromFile('./Public/assets/db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log('Writing notes');
    const {title, text} = req.body;

    if (title){
        const newNote = {
            title,
            text,
            id: uuid()
        };
        readAndAppend(newNote, './Public/assets/db/notes.json');
        res.json('Added new note');
    }
    else{
        res.json('Failed to add note');
    }
});

notes.delete('/:term', (req, res) => {
    console.log('Delete requested');

    const targetId = req.params.term;

    fs.readFile('./Public/assets/db/notes.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        let fileData = JSON.parse(data);
        let targetIndex;

        for (index in fileData){
            if(fileData[index].id == targetId){
                targetIndex = index;
            } 
        }
    
        fileData.splice(targetIndex, 1);
        fs.writeFile('./Public/assets/db/notes.json', JSON.stringify(fileData), (writeErr) => 
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!'));
        res.json('Delete finished');
    })
});



module.exports = notes;