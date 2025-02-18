const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;

const app = express();

const api = require('./Public/assets/js/holder.js');


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('Public'));


app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/index.html'))
});

app.get('/notes.html', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/notes.html'))
    
});




app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});