import { SitemapStream, streamToPromise } from 'sitemap'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const protocol = event.node.req.headers['x-forwarded-proto'] || 'https'
  const host = event.node.req.headers.host || 'rechip-tuning.ru'
  const hostname = `${protocol}://${host}`

  // Устанавливаем заголовок для корректного отображения XML
  setResponseHeader(event, 'Content-Type', 'application/xml')

  const sitemap = new SitemapStream({ hostname })

  try {
    // Получаем список URL из sitemap.txt
    const { data } = await axios.get('https://api.rechip-tuning.ru/sitemap.txt')

    const pages = data.split('\n').filter((page) => page.trim() !== '')

    for (const page of pages) {
      sitemap.write({ url: page.trim(), changefreq: 'daily' })
    }

    sitemap.end()
    return streamToPromise(sitemap)
  } catch (error) {
    console.error('Ошибка при генерации Sitemap:', error)
    throw createError({ statusCode: 500, message: 'Ошибка генерации Sitemap' })
  }
})
