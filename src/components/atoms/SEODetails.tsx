import React from 'react'
import Head from 'next/head'
import type {ImageType} from './ImageAttributesType'
import {apiConfig} from '../../config/apiConfig'
import {useSelector} from '../../hooks'

export type SEODetailsType = {
  metaTitle: string
  metaDescription: string
  keywords: string
  hostname?: string
  metaImage: ImageType
}
export type SiteMetaData = {
  title: string
  hostname: string
  keywords: string[]
  metaImage: string
  description: string
}

type SeoDetailsPropsType = {seo: SEODetailsType | null}
export const SEODetails: React.FC<SeoDetailsPropsType> = ({seo}) => {
  const siteInfo = useSelector(state => state.site.siteInfo)
  const title = `${seo?.metaTitle ?? ''}${seo?.metaTitle ? ' | ' : ''}${siteInfo.seo.metaTitle}`
  const imageUrl =
    apiConfig.assets +
    (seo?.metaImage.data?.attributes.formats.thumbnail.url ??
      siteInfo.seo.metaImage.data?.attributes.formats.thumbnail.url)

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta
        content="default-src 'self' 'unsafe-eval' 'unsafe-inline' * blob: data: filesystem:; object-src 'none';"
        httpEquiv="Content-Security-Policy"
      />
      <meta content="basic-page" name="template" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="index,follow" name="robots" />
      <meta content={seo?.metaDescription ?? siteInfo.seo.metaDescription} name="description" />
      <meta content={title} itemProp="name" />
      <meta content={seo?.metaDescription ?? siteInfo.seo.metaDescription} itemProp="description" />
      <meta content={imageUrl} itemProp="image" />
      <meta content={imageUrl} property="og:image" />
      <meta content={title} property="og:title" />
      <meta content={seo?.metaDescription ?? siteInfo.seo.metaDescription} property="og:description" />
      <meta content={seo?.metaTitle ?? siteInfo.seo.metaTitle} property="og:site_name" />
      <meta content={siteInfo.seo.hostname} property="og:url" />
      <meta content={seo?.keywords} name="keywords" />
      <meta content={seo?.keywords} name="news_keywords" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={seo?.metaDescription ?? siteInfo.seo.metaDescription} name="twitter:description" />
      <meta content={imageUrl} name="twitter:image:src" />
      <title>{title}</title>
    </Head>
  )
}
