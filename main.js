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

console.error = err => {             
	               bot.sendMessage(jusdepatate, err)            
			console.log('\x1b[31m' + err + '\x1b[0m')        
		       }

bot.on(['/start'], (msg) => msg.reply.text("Hi! I'm Potato Juice, nice to meet you! My dad is @jusdepatate (dm friendly) type '/' and see what i can do, keep in mind i'm just in 'Beta' phase"));

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
bot.on(['/8ball', '/8balls'], function (msg) {
	var truc = ["I can't say anything", "<:8ball:404631321651052545> It seems like yes...", "<:8ball:404631321651052545> Everything say no...", "<:8ball:404631321651052545> visibly, yes", "<:8ball:404631321651052545> no !"];
	var truc2 = Math.floor(Math.random()*truc.length);
    msg.reply.text(truc[truc2]);
})
bot.on(['/p', '/ping'], function (msg) {
msg.reply.text('Pong !');
})
bot.on(['/s', '/shrug'], function (msg) {
    msg.reply.text('¯\\\_(ツ)_/¯');
})

bot.start();
