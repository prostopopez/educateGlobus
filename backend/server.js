const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { crypto } = require('crypto');
const booksData = require('./getBooksData');
const authorsData = require('./getAuthorsData');
const genresData = require('./getGenresData');
const collectionsData = require('./getCollectionsData');
const userData = require('./userModel');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
    'mongodb+srv://prostopopez:prostopopez@cluster0-qljpi.mongodb.net/labrioteka?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('подключение к БД успешно'));

db.on('error', console.error.bind(console, 'Подключение к БД не удалось:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getBooksData', (req, res) => {
    booksData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getAuthorsData', (req, res) => {
    authorsData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/updateAthorsData', (req, res) => {
    const { _id, update } = req.body;
    booksData.findByIdAndUpdate(_id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.get('/getGenresData', (req, res) => {
    genresData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getCollectionsData', (req, res) => {
    collectionsData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/updateBooksData', (req, res) => {
    const { _id, update } = req.body;
    booksData.findByIdAndUpdate(_id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteBooksData', (req, res) => {
    const { _id } = req.body;
    booksData.findByIdAndRemove(_id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


router.post('/putBooksData', (req, res) => {
    let data = new booksData();

    const {
        _id,
        bookName,
        bookPrice,
        bookPublisher,
        bookPubDate,
        bookImg,
        bookDescription
    } = req.body;

    if ((!_id && _id !== 0)
        || !bookName
        || !bookPrice
        || !bookPublisher
        || !bookPubDate
        || !bookImg
        || !bookDescription ) {

        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.bookName = bookName;
    data.bookPrice = bookPrice;
    data.bookPublisher = bookPublisher;
    data.bookPubDate = bookPubDate;
    data.bookImg = bookImg;
    data.bookDescription = bookDescription;
    data._id = _id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.get('/getUserData', (req, res) => {
    userData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/putUserData', (req, res) => {
    let data = new userData();

    const { id,
        username,
        password
    } = req.body;

    if ((!id && id !== 0) || !username || !password) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.username = username;
    data.password = password;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Прослушивается порт ${API_PORT}`));