const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const mulConfig = require('./config/multer_config');
const connectDB = require("./config/db_config");
const dbModel = require('./config/db_model');
const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/upimg', mulConfig.uploadImg, async (req, res) => {
    if(!req.file){
        res.status(400).send('Error: No such file');
        return;
    }
    const item = new dbModel({
        userid: req.body.uid,
        path: req.body.uri
    });
    item.img.data = fs.readFileSync(req.file.path);
    item.img.contentType = "image/jpg";
    const id = req.body.uid;
    const imgpath = req.body.uri;
    console.log('path',imgpath);
    console.log('id',id);
    try{
        await item.save();
    }
    catch(err){
        res.status(500).send(err);
    }
    finally{
        console.log('Upload successful');
        return res.sendStatus(201).end();
    }
});

app.get('/', function(req,res){
    res.send('Online NOW!!');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});