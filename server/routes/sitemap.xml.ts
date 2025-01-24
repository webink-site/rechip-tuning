import { SitemapStream, streamToPromise } from 'sitemap'
import axios from 'axios'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event: any) => {
  const protocol = event.node.req.headers['x-forwarded-proto'] || 'https'
  const host = event.node.req.headers.host || 'msk.rechip-tuning.ru'
  const hostname = `${protocol}://${host}`

  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({ hostname })
  sitemap.write({
    url: sitemap.hostname,
    changefreq: 'daily'
  })
  for (const doc of docs) {
    if (doc._path) {
      sitemap.write({
        url: doc._path,
        changefreq: 'daily'
      })
    }
  }

  // fetch pages
  const { data } = await axios.get('https://api.rechip-tuning.ru/sitemap.txt')
  const pages = data.split('\n')
  for (const page of pages as any) {
    sitemap.write({ url: `${sitemap.hostname}${page}`, changefreq: 'daily' })
  }

  // sitemap.write({ url: `${sitemap.hostname}cars`, changefreq: 'monthly' })
  // sitemap.write({ url: `${sitemap.hostname}for-clients`, changefreq: 'monthly' })
  // sitemap.write({ url: `${sitemap.hostname}services`, changefreq: 'monthly' })
  // sitemap.write({ url: `${sitemap.hostname}about`, changefreq: 'monthly' })
  // sitemap.write({ url: `${sitemap.hostname}contacts`, changefreq: 'monthly' })

  sitemap.end()
  return streamToPromise(sitemap)
})
