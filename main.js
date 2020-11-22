const vk_token = 'ffd8131c3cabeab91dc3b6e53c70d958cb711c88221907e0a7a7b09eb10a577c9b024acd04ec56c7f280a';
const confirm_key = '90fbe27e';
const express = require('express');
const bodyParser = require('body-parser');
const { Botact } = require('botact');

const server = express();
const bot = new Botact({
    token: vk_token,
    confirmation: confirm_key
});


bot.event('group_join', (msg) => {
    msg.reply('Спасибо, что стали пользователем нашего бота. Мы постараемся вам помочь!');
});

bot.command('help', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом')
});

bot.command('start', (msg) => {
    msg.reply( 'Выберите пункт из меню:', null, {
        one_time: true,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        payload: { 
                            button: 'button1' 
                        },
                        label: 'Пройти тест'
                    },
                    color: 'primary'
                },
                {
                    action: {
                        type: 'text',
                        payload: {
                            button: 'button2'
                        },
                        label: 'Получить помощь'
                    },
                    color: 'primary'
                }  
            ]
        ]
      })
});

bot.command('Пройти тест', (msg) => {
    msg.sendMessage(msg.user_id, 'Тест находится в разработке');
    
});

bot.command('Получить помощь', (msg) => {
    msg.sendMessage(msg.user_id, 'Да поможет вам бог, мы еще не знаем номер телефона');
    
});

bot.catch((msg,err) => {
    console.error(msg, err);
});

server.use(bodyParser.json());

server.post('/', bot.listen);

server.listen(8080);