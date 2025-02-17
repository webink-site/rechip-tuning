// import axios from 'axios'

// export default defineEventHandler(async (event) => {
//   try {
//     // Запрашиваем robots.txt с бэкенда
//     const { data } = await axios.get('https://api.rechip-tuning.ru/api/robots.txt')

//     // Устанавливаем заголовки ответа
//     setResponseHeaders(event, {
//       'Content-Type': 'text/plain',
//       'Cache-Control': 'public, max-age=3600'
//     })

//     return data
//   } catch (error) {
//     // Фоллбек robots.txt, если API недоступен

//     return 'User-agent: *\nDisallow: /'
//   }
// })
import { Readable } from 'stream'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const protocol = event.node.req.headers['x-forwarded-proto'] || 'https'
  const host = event.node.req.headers.host || 'rechip-tuning.ru'
  const hostname = `${protocol}://${host}`

  try {
    // Получаем robots.txt с API
    const { data } = await axios.get('https://api.rechip-tuning.ru/api/robots.txt')

    // Заменяем {hostname} в шаблоне, если API возвращает плейсхолдеры
    const robotsContent = data.replace(/{hostname}/g, hostname)

    // Устанавливаем заголовки для правильной отдачи файла
    setResponseHeaders(event, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    })

    return new Readable({
      read () {
        this.push(robotsContent)
        this.push(null)
      }
    })
  } catch (error) {
    console.error('Ошибка при получении robots.txt:', error)
    // Фоллбек robots.txt, если API недоступен
    return new Readable({
      read () {
        this.push('User-agent: *\nDisallow: /')
        this.push(null)
      }
    })
  }
})
