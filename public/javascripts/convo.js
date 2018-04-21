var botui = new BotUI('api-bot');
var socket = io.connect('http://localhost:8010');
// read the BotUI docs : https://docs.botui.org/
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '6fa0bd52-cbc0-4247-8b23-5029dde216c2',
  'password': 'AnN1ea4qJRAq',
  'version_date': '2018-03-16'
});

botui.message.add({
    content: 'Hello, how are you doing?',
    delay: 1500,
  }).then(function () {
    botui.action.text({
      action: {
        placeholder: 'Say Hello', }
    }
 ).then(function () {


      botui.message.add({
          content: "Q1",
          delay: 500,
        });

    }). then(function () {
    botui.action.text({
      action: {
        placeholder: 'Write your answer', }
    }
 ).then(function (res) {
   // socket.emit('fromClient', { client : res.value }); // sends the message typed to server
     // console.log(res.value); // will print whatever was typed in the field.
     var parameters = {
  'text': '' + res.value,
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}
    }).then(natural_language_understanding.analyze(parameters, function(err, response) {
  if (err){
    console.log("eeeee")
    console.log('error:', err);
  }
  else{
    var result = "";
    console.log("eeeeeaaaa")
    for(var i=0; i<response.keywords.length; i++){
      result += "Sentiment Score: "+ response.keywords[i].sentiment.score + "\r\nEmotion Scores:\r\nSadness: " + response.keywords[i].emotion.sadness + "\r\nJoy: " + response.keywords[i].emotion.joy + "\r\nFear: " + response.keywords[i].emotion.fear + "\r\nDisgust: " + response.keywords[i].emotion.disgust + "\r\nAnger: " + response.keywords[i].emotion.anger + "\r\nSubject: " + response.keywords[i].text+"\r\n";
    }
  }
}))
     }).then(function () {

      //socket.on('fromServer', function (data) { // recieveing a reply from server.
       // console.log(data.server);
      botui.message.add({
          content: "result",
          delay: 500,
        });
      });


    });
 // });
