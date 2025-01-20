import axios from 'axios'
// 一次引用所有有名字的東西取名成後面的東西
import template from '../templates/plant.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.taipei/api/v1/dataset/e20706d8-bf89-4e6a-9768-db2a10bb2ba4?scope=resourceAquire&resource_id=e20706d8-bf89-4e6a-9768-db2a10bb2ba4&limit=200')

    const courses = []
    const t = template()

    const rand = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const randomNumder = rand(0, 109)

    t.body.contents[0].text = data.result.results[randomNumder].f_name_ch
    t.body.contents[1].contents[0].contents[1].text = data.result.results[randomNumder].f_name_en
    t.body.contents[1].contents[1].contents[1].text = data.result.results[randomNumder].f_name_latin
    t.footer.contents[2].text = data.result.results[randomNumder].f_feature

    courses.push(t)

    const result = await event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: {
        type: 'carousel',
        contents: courses
      }
    })
    console.log(result)
    if (process.env.DEBUG === 'true' && result.message) {
      fs.writeFileSync('./dump/fe.json', JSON.stringify(courses, null, 2))
    }
  } catch (error) {
    console.log('error')
    console.error(error)
  }
}
