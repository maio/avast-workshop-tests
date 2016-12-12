var uuid = require('uuid');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function () {
  var db = {
    sessionId2userId: {},
    messages: [],
    insertMessage: function (author, message) {
      this.messages.push({author: author, message: message});
    }
  };

  var app = express();

  app.use(bodyParser.json());

  app.post('/login', function (req, res) {
    var userId = req.body.userId;

    if (!userId) {
      return res.status(403).send({error: 'Invalid userId'});
    }

    var sessionId = uuid.v4();
    db.sessionId2userId[sessionId] = userId;

    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({sessionId: sessionId}));
  });

  app.get('/chat', function (req, res) {
    var sessionId = req.body.sessionId;

    if (!sessionId || !db.sessionId2userId[sessionId]) {
      return res.status(403).send({error: 'Invalid sessionId'});
    }

    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({messages: db.messages}));
  });

  app.post('/chat', function (req, res) {
    var sessionId = req.body.sessionId;
    var message = req.body.message;

    if (!sessionId || !db.sessionId2userId[sessionId]) {
      return res.status(403).send({error: 'Invalid sessionId'});
    }

    if (!message) {
      return res.status(403).send({error: 'Invalid message'});
    }

    var userId = db.sessionId2userId[sessionId];

    db.insertMessage(userId, message);

    return res.end();
  });

  return app;
};
