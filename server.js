const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const mulConfig = require('./config/multer_config');
const connectDB = require("./config/db_config");
const {ImgModel,PredictModel,BlogModel} = require('./config/db_model');
const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//about Image for predict
app.post('/upimg', mulConfig.uploadImg, async (req, res) => { //upload image
    if(!req.file){
        res.status(400).send('Error: No such file');
        return;
    }
    const item = new ImgModel({
        userid: req.body.uid,
    });
    console.log('id',req.body.uid);
    try{
        item.img.data = req.file.buffer//fs.readFileSync(req.file.path);
        item.img.contentType = "image/jpg";
        item.img.uri = req.body.uri;
        console.log('model');
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
app.get('/getimg/:id', async (req,res)=>{ //get image by id to display
    const id = req.params.id;
    try{
        const product = await ImgModel.findOne({'userid': id});
        console.log('product',product)
        res.send(product['img']['uri']);
    }
    catch(err){
        res.status(500).send(err);
    }
});
app.get('/getimg', async (req,res)=>{ //get all image
    const all = await ImgModel.find({});
    res.send(all);
});

//about blog
app.post('/upblog', async (req,res)=>{
    try{
        const item = new BlogModel();
        item.blogid = '2';
        item.title = {
            main: 'justin',
            subtitle: 'beawer'
        };
        item.data = 'baby';
        await item.save();
    }
    catch(err){
        res.status(500).send('upload blog error');
    }
    finally{
        res.status(201).send('upload successful');
    }
});
app.get('/getblog', async (req,res)=>{ //get all blog some info
    try{
        const blog = await BlogModel.find({},{fields: {data: 0}});
        const item = {
            blogid: blog['blogid'],
            title: blog['title']
        };
        res.send(blog);
    }
    catch(err){
        res.status(500).send('get blog error');
    }
});
app.get('/getblog/:id', async (req,res)=>{
    const blogid = req.params.id;
    try{
        const blog = await BlogModel.findOne({'blogid': blogid});
        console.log('blog',blog);
        res.send(blog);
    }
    catch(err){
        res.status(500).send(err);
    }
});

//about predict class
app.post('/uppred',async (req,res) => { //write predictclass to db(not finished)
    const item = new PredictModel({
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
app.get('/getpred/:id', async (req,res)=>{ //get predictclass by id(not finished)
    const id = req.params.id;
    const product = await PredictModel.findOne({'userid': id});
    res.send(product['class']);
});
app.get('/getpred', async (req,res)=>{ //get all predictclass(not finished)
    const all = await PredictModel.find({});
    res.send(all);
});

app.get('/', function(req,res){ //test api online or not
    res.send('Online NOW!!');
});
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});