import React from 'react'
import {apiConfig} from '../../config/apiConfig'

export type ImageType = { link: string, altText: string }

type ImagePropsType = { image: ImageType; width?: number | string; }

export const Image: React.FC<ImagePropsType> = ({image, width}) => {
  return (
    <img
      width={width}
      height={width}
      src={apiConfig.assets + image.link}
      alt={image.altText}
    />
  )
}
