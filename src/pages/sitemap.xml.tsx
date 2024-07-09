import type {GetServerSideProps, NextPage} from 'next'
import {formatDate} from '../utils/utils'
import {CMSService} from '../services'

const Sitemap: NextPage = () => null
export default Sitemap
const generateSiteMap = async (): Promise<string> => {
  const site = await CMSService.getSiteInfo()
  const pageList = await CMSService.getPageList()
  const urls = pageList.map(page => {
    return `<url>
                <loc>${site.seo.hostname ?? ''}/${page.slug}</loc>
                <lastmod>${formatDate(new Date(page.updatedAt), 'YYYY-MM-DD')}</lastmod>
            </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${urls.join('')}
          </urlset>`
}

export const getServerSideProps: GetServerSideProps<Record<string, unknown>> = async ctx => {
  ctx.res.setHeader('Content-Type', 'text/xml')
  const xml = await generateSiteMap()
  ctx.res.write(xml)
  ctx.res.end()

  return {props: {}}
}
