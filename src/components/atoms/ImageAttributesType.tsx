import React from 'react'

export type ImageType = { link: string; altText: string }
type ImagePropsType = { image: ImageType; width?: number | string; height?: number | string }

export const Image: React.FC<ImagePropsType> = ({image, width, height}) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img width={width} height={height} src={image.link} alt={image.altText}/>
}
