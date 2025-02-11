import { SitemapStream, streamToPromise } from 'sitemap'
import axios from 'axios'
// import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event: any) => {
  const protocol = event.node.req.headers['x-forwarded-proto'] || 'https'
  const host = event.node.req.headers.host || 'msk.rechip-tuning.ru'
  const hostname = `${protocol}://${host}`

  // Fetch all documents
  const sitemap = new SitemapStream({ hostname })

  // fetch pages
  const { data } = await axios.get('https://api.rechip-tuning.ru/sitemap.txt')
  const pages = data.split('\n')
  for (const page of pages as any) {
    sitemap.write({ url: `${sitemap.hostname}${page}`, changefreq: 'daily' })
  }

  sitemap.end()
  return streamToPromise(sitemap)
})
