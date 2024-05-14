require('dotenv').config();

require('./dbConnect');

const express = require('express');
const { getAllData, getMediaLinks, getWebLinks } = require('./getData');
const WebData = require('./models/webData.model');
const app = express()
const port = process.env.PORT || 8000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());

app.get("/", (req, res) => {
    res.send("Root page");
})

app.post('/getData', async (req, res) => {

    try {
        const { url } = req.body;
        let keyWords = await getAllData(url);
        res.send({ keyWords });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

});

app.post('/mediaLinks', async (req, res) => {
    try {
        let { url } = req.body;
        let imgData = await getMediaLinks(url);
        res.send({ imgData });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

});

app.post('/webLinks', async (req, res) => {

    try {
        let { url } = req.body;
        let webData = await getWebLinks(url);
        res.send({ webData });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

});



app.post('/saveData', async (req, res) => {

    try {
        const { domainName, wordCount, webLinks, mediaLinks } = req.body;

        const newData = new WebData({ domainName, wordCount, webLinks, mediaLinks });

        const data = await newData.save();

        res.send({ data });
    } catch (error) {
        console.log(error);
        res.send({Msg: "Url already present", code: 11000});
    }

});

app.get('/getAllData', async (req, res) => {

    try {
        const allData = await WebData.find();

        res.send({ data: allData });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

});

app.put('/addFavourite', async (req, res) => {

    const { id } = req.body;

    const data = await WebData.findOneAndUpdate({ _id: id }, { favourite: true });

    res.send({ data });
});

app.put('/removeFavourite', async (req, res) => {

    const { id } = req.body;

    const data = await WebData.findOneAndUpdate({ _id: id }, { favourite: false });

    res.send({ data });
});

app.delete('/removeData', async (req, res) => {
    const { id } = req.body;

    const data = await WebData.findOneAndDelete({ _id: id });

    res.send({ data });
});

app.get('/getOne', async (req, res) => {

    const { id } = req.body;

    const data = await WebData.findOne({ _id: id });

    res.send({ data });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});