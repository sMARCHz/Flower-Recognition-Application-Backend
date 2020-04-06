const express = require('express');
const bodyParser = require('body-parser');
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
        path: req.file.path
    });
    item.img.data = req.file.buffer;
    item.img.contentType = "image/jpg";

    console.log('path',req.file.path);
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
});

app.get('/getimg/:id', async (req,res)=>{
    const {id} = req.params.id;
    const product = await dbModel.findOne({'userid': id});
    const all = await dbModel.find();
    try{
        res.send('product',product);
        res.send(all);
        //res.send(product[0]['path']);
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/', function(req,res){
    res.send('Online NOW!!');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});