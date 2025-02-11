import axios from 'axios'

export default defineEventHandler(async (event) => {
  try {
    // Запрашиваем robots.txt с бэкенда
    const { data } = await axios.get('https://api.rechip-tuning.ru/api/robots.txt')

    // Устанавливаем заголовки ответа
    setResponseHeaders(event, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    })

    return data
  } catch (error) {
    // Фоллбек robots.txt, если API недоступен
    return 'User-agent: *\nDisallow: /'
  }
})
