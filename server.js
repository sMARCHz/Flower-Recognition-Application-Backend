const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const mulConfig = require('./config/multer_config');
const connectDB = require("./config/db_config");
const dbModel = require('./config/db_model');
const predModel = require('./config/db_predmodel');
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
    });
    console.log('id',req.body.uid);
    try{
        item.img.data = fs.readFileSync(req.file.path);;
        item.img.contentType = "image/jpg";
        item.img.uri = '/public/Image-'+ Date.now() + '-' + req.body.filename;
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

app.post('/uppred',async (req,res) => {
    const item = new predModel({
        userid: req.body.uid,
        class: req.body.class
    });
    console.log('id',req.body.uid);
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
})

app.get('/getimg/:id', async (req,res)=>{
    const id = req.params.id;
    const product = await dbModel.findOne({'userid': id});
    res.send(product['img']['uri']);
});

app.get('/getimg', async (req,res)=>{
    const all = await dbModel.find({});
    res.send(all);
});

app.get('/getpred/:id', async (req,res)=>{
    const id = req.params.id;
    const product = await predModel.findOne({'userid': id});
    res.send(product['class']);
});

app.get('/getpred', async (req,res)=>{
    const all = await predModel.find({});
    res.send(all);
});

app.get('/', function(req,res){
    res.send('Online NOW!!');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});