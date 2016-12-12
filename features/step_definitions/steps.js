var request = require('supertest-as-promised');
var expect = require('chai').expect;
var buildApp = require('../../src/web.js');

module.exports = function () {
  this.Given('app is running', function () {
    this.agent = request(buildApp());
  });

  this.Given('that {stringInDoubleQuotes} is logged in', function (userId) {
    return this.agent.post('/login')
      .send({userId: userId})
      .expect(200)
      .expect(function (res) {
        var sessionId = res.body.sessionId;
        expect(sessionId).to.exist;

        this.users[userId] = {
          sessionId: sessionId
        };
      }.bind(this));
  });

  this.When('{stringInDoubleQuotes} sends following messages', function (userId, table) {
    return Promise.all(table.hashes().map(function (row) {
      return this.agent.post('/chat')
        .send({
          sessionId: this.users[userId].sessionId,
          message: row.message
        })
        .expect(200);
    }.bind(this)));
  });

  this.Then('{stringInDoubleQuotes} sees following messages', function (userId, table) {
    return this.agent.get('/chat')
      .send({sessionId: this.users[userId].sessionId})
      .expect(200, {messages: table.hashes()});
  });
};
