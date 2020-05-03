const express = require('express');
const Chat = require('../models/chat');
const Chart = require('chart.js');
const router = new express.Router();

router.get('/secure/chart', async (req, res) => {
    res.render("chart/chart");
});

router.get('/secure/chart/dataset', async (req, res) => {
    let hello = await Chat.find({}, {messages: 1});

    const color = Chart.helpers.color;

    let datasets = [];

    for (const chat of hello) {
        let object = {
            label: 'Dataset with date object point data',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(43,96,255,0.5)',
            fill: false,
            data: []
        };
        for (const message of chat.messages) {
            object.data.push(
                {
                    x: new Date(message.date * 1000),
                    y: Math.random() * 100
                }
            );
        }
        datasets.push(object);
    }
    res.send(datasets);
});

router.get('/test', async (req, res) => {

    let hello = await Chat.find({}, {messages: 1});
    let megaArray = [];

    hello.forEach(chat => megaArray = megaArray.concat(chat.messages));

    let map = {};

    for (var i = 0, l = dates.length; i < l; i++) {
        var date = dates[i];

        map[date] = map[date] ? map[date] + 1 : 1;
    }

    res.send(datasets);
});

module.exports = router;