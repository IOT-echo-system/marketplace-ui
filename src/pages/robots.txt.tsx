import type {GetServerSideProps, NextPage} from 'next'
import {siteDetails} from '../../data/siteDetails'
import type {SiteMetaData} from '../components/atoms'

const Robots: NextPage = () => null
export default Robots
const generateRobots = async (): Promise<string> => {
  const site: SiteMetaData = await new Promise(resolve => {
    resolve(siteDetails.metadata)
  })
  return `User-agent: *

#Sitemap
Sitemap: https://${site.hostname}/sitemap.xml
`
}

export const getServerSideProps: GetServerSideProps<Record<string, unknown>> = async ctx => {
  ctx.res.setHeader('Content-Type', 'text/plain')
  const robots = await generateRobots()
  ctx.res.write(robots)
  ctx.res.end()

  return {props: {}}
}
