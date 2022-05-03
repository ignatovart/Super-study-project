const exp = require('constants');
const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const app = express();
const res = require('express/lib/response');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;

const userScheme = new Schema({name: String, number: String, date: Date, mail: String, category: String, message: String}, {versionKey: false});
const User = mongoose.model("User", userScheme);

mongoose.connect("mongodb+srv://mongodb:1234@cluster0.48dkl.mongodb.net/bank?retryWrites=true&w=majority",{useNewUrlParser: true,}, (err) => {
    if(err) {
        return console.log(err);
    }

    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

// создаем объект MongoClient и передаем ему строку подключения

const urlencodedParser = express.urlencoded({extended: false});



app.use(express.static(__dirname + '/index.html'));
app.use(express.static(__dirname + '/'));



app.get('/',(request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// Обработка формы бесплатной консультации
app.post('/cons', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    const userName = request.body.userName;
    const numberUser = request.body.numberUser;
    const consultationDate = request.body.consultationDate;
    const email = request.body.email;

    const recordConsultation = new User({name: userName, number: numberUser, date: consultationDate, mail: email, category: "Запись на бесплатную консультацию", message: null});

    recordConsultation.save((err) => {
        if (err) {
            console.log(err);
        }

        response.sendFile(__dirname + '/index.html');
    });
});

// Обработка формы закрытия предприятия
app.post('/closing', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    const userName = request.body.userName;
    const numberUser = request.body.numberUser;
    const consultationDate = request.body.consultationDate;
    const email = request.body.email;
    const type = request.body.closing;

    const recordConsultation = new User({name: userName, number: numberUser, date: consultationDate, mail: email, category: type, message: null});

    recordConsultation.save((err) => {
        if (err) {
            console.log(err);
        }

        response.sendFile(__dirname + '/index.html');
    });
});

// Обработка формы адвокатского сопровождения
app.post('/support', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    const userName = request.body.userName;
    const numberUser = request.body.numberUser;
    const consultationDate = request.body.consultationDate;
    const email = request.body.email;
    const type = request.body.support;

    const recordConsultation = new User({name: userName, number: numberUser, date: consultationDate, mail: email, category: type, message: null});

    recordConsultation.save((err) => {
        if (err) {
            console.log(err);
        }

        response.sendFile(__dirname + '/index.html');
    });
});

// Обработка формы налогового аудита
app.post('/audit', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    const userName = request.body.userName;
    const numberUser = request.body.numberUser;
    const consultationDate = request.body.consultationDate;
    const email = request.body.email;
    const type = request.body.audit;

    const recordConsultation = new User({name: userName, number: numberUser, date: consultationDate, mail: email, category: type, message: null});

    recordConsultation.save((err) => {
        if (err) {
            console.log(err);
        }

        response.sendFile(__dirname + '/index.html');
    });
});

// Обработка формы налогового аудита
app.post('/getcons', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    const userName = request.body.userName;
    const numberUser = request.body.numberUser;
    const petition = request.body.message;
    const email = request.body.email;
    const type = request.body.type;

    const recordConsultation = {name: userName, number: numberUser, date: consultationDate, mail: email, category: type, message: petition};

    const collection = request.app.locals.collection;
    collection.insertOne(recordConsultation, (err, result) => {
        if (err) {
            console.log(err);
        }

        response.send(type);
    })
});


