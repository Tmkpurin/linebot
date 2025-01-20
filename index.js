import 'dotenv/config'
import linebot from 'linebot'
import plant from './commands/plant.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (event.message.type === 'text') {
    if (event.message.text === 'plant') {
      plant(event)
    }
  }
})

bot.on('postback', event => {
  event.reply('postback:' + event.postback.data)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人開機')
})
