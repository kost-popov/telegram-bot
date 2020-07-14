const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

let token = '1056462139:AAEU9J7G2a6G4Cf3u4MxFNQwKWjIQUYbZJw';
let bot = new TelegramBot(token, {polling: true});

let notes = [
    { uid: 933278809, time: 'тогда-то', text: 'что-нибудь' },
    { uid: 933278809, time: 'потом', text: 'важную вещь' },
    { uid: 933278809, time: 'завтра', text: 'суббота' },
];

bot.onText(/напомни (.+) в (.+)/, (msg, match) =>  {
  let userId = msg.from.id;
  let text = match[1];
  let time = match[2];

  notes.push({ 'uid': userId, 'time': time, 'text': text });

  bot.sendMessage(userId, 'Отлично! Я обязательно напомню :)');
});

bot.onText(/количество/, (msg, match) =>  {
    let userId = msg.from.id;
    const sum = notes.length;
    bot.sendMessage(userId, 'Сейчас у меня ' + notes.length + ' напоминаний');
});

bot.onText(/тест (.+) в (.+) в (.+)/, (msg, match) =>  {
    let userId = msg.from.id;
    bot.sendMessage(userId, 'Отлично! Тест пройден');
    console.log(match)
});

bot.onText(/П|привет/, (msg, match) =>  {
    let userId = msg.from.id;
    bot.sendMessage(userId, 'Привет');
    console.log(match)
});

bot.onText(/фото/, (msg, match) =>  {
    let chat_id = msg.from.id;
    const photo = fs.createReadStream('image.jpg');
    // bot.sendPhoto(
    //     chat_id,
    //     photo
    //     );
    // bot.sendMessage(chat_id, 'Отлично! Тест пройден');
    //console.log(match)
});

bot.onText(/тест2/, (msg, match) =>  {
    let userId = msg.from.id;
    bot.sendMessage(userId, 'Отлично! Тест пройден');
    console.log(match)
});

setInterval(() => {
  //console.log(notes);
  const curDate = new Date().getHours() + '.' + new Date().getMinutes();
  //console.log(curDate);
  for (let i = 0; i < notes.length; i++) {
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);
