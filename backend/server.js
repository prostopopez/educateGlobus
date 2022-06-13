const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const {crypto} = require('crypto');
const coursesData = require('./getCoursesData');
const testsData = require('./getTestsData');
const promoData = require('./getPromoData');
const userData = require('./userModel');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
    'mongodb+srv://prostopopez:prostopopez@cluster0.qljpi.mongodb.net/educateGlobus?retryWrites=true&w=majority';

mongoose.connect(dbRoute, {useNewUrlParser: true});

let db = mongoose.connection;

db.once('open', () => console.log('подключение к БД успешно'));

db.on('error', console.error.bind(console, 'Подключение к БД не удалось:'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// курсы
router.get('/getCoursesData', (req, res) => {
    coursesData.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

router.delete('/deleteCoursesData', (req, res) => {
    const {_id} = req.body;
    coursesData.findByIdAndRemove(_id, (err) => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});


router.post('/putCoursesData', (req, res) => {
    let data = new coursesData();

    const {
        _id,
        author,
        name,
        topics,
        time,
        level,
        description,
        rating,
        img,
        price
    } = req.body;

    if ((!_id && _id !== 0)
        || !author
        || !name
        || !topics
        || !time
        || !level
        || !description
        || !rating
        || !img
        || !price) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.author = author;
    data.name = name;
    data.topics = topics;
    data.time = time;
    data.level = level;
    data.description = description;
    data.rating = rating;
    data.img = img;
    data.price = price;
    data._id = _id;
    data.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

// тесты
router.get('/getTestsData', (req, res) => {
    testsData.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

router.delete('/deleteTestsData', (req, res) => {
    const {_id} = req.body;
    testsData.findByIdAndRemove(_id, (err) => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});


router.post('/putTestsData', (req, res) => {
    let data = new testsData();

    const {
        _id,
        difficulty,
        name,
        questions,
        time,
        img
    } = req.body;

    if ((!_id && _id !== 0)
        || !difficulty
        || !name
        || !questions
        || !time
        || !img) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.difficulty = difficulty;
    data.name = name;
    data.questions = questions;
    data.time = time;
    data.img = img;
    data._id = _id;
    data.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

// промо
router.get('/getPromoData', (req, res) => {
    promoData.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

router.post('/putPromoData', (req, res) => {
    let data = new promoData();

    const {
        _id,
        promoCode
    } = req.body;

    if ((!_id && _id !== 0)
        || !promoCode) {

        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.promoCode = promoCode;
    data._id = _id;
    data.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

router.get('/getUserData', (req, res) => {
    userData.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

router.post('/updateUserData', (req, res) => {
    const {_id, update} = req.body;
    userData.findByIdAndUpdate(_id, update, (err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

router.post('/putUserData', (req, res) => {
    let data = new userData();

    const {
        id,
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
    data.promos_id = [];
    data.id = id;
    data.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Прослушивается порт ${API_PORT}`));
