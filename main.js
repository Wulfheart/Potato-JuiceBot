const TeleBot = require('telebot');
const req = require("request");
const catapi = 'https://thecatapi.com/api/images/get?format=src&type='
const bot = new TeleBot({
    token: process.env.token, // Required. Telegram Bot API token.
    polling: { // Optional. Use polling.
        interval: 1000, // Optional. How often check updates (in ms).
        timeout: 0, // Optional. Update polling timeout (0 - short polling).
        limit: 100, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    }
});

bot.on(['/start'], (msg) => msg.reply.text('Hello!'));

bot.on(['/c', '/cat'], function (msg) {
 // based on https://github.com/mullwar/telebot/blob/master/examples/KittyBot.js

    let promise;
    let id = msg.chat.id;

        promise = bot.sendPhoto(id, catapi + 'jpg', {
            fileName: 'kitty.jpg',
            serverDownload: true
        });

    // Send "uploading photo" action
    bot.sendAction(id, 'upload_photo');

    return promise.catch(error => {
        console.log('[error]', error);
        // Send an error
        bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
    });

});
bot.on(['/d', '/dog'], function (msg) {

    req("https://random.dog/woof.json", function (err, response, body) {
        let dog = JSON.parse(body)
        msg.reply.text(dog.url);
      });   
});
bot.on(['/w', '/weather'], function (msg) {
    const city = msg.text.split(' ')[1];

    req("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + process.env.wapi, function (err, response, body) {
        let weather = JSON.parse(body)
        if(weather.message){
            msg.reply.text('Error! It\'s probably because you have selected a none valid city');
        } else {
          
          msg.reply.text("It's " + weather.main.temp + "°C in " + weather.name + " (" + weather.sys.country  + ") !");
        }
      });   
});

bot.start();
