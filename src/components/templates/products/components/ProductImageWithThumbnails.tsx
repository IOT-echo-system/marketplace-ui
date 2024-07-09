import {ProductDetails} from '../Product'
import React, {useState} from 'react'
import {Stack} from '@mui/material'
import {Image} from '../../../atoms'
import theme from '../../../../theme/theme'
import {useMedia} from '../../../../hooks'

export const ProductImageWithThumbnails: React.FC<{product: ProductDetails}> = ({product}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const media = useMedia()
  return (
    <Stack direction={media.xl ? 'column-reverse' : 'row'} spacing={media.lg ? 2 : 4}
           alignItems={media.md ? 'center' : 'start'}>
      <Stack direction={media.xl ? 'row' : 'column'} flexWrap={'wrap'}>
        {product.images.map((image, index) => {
          return (
            <Stack
              key={`image-${index}`}
              border={
                currentImage === index
                  ? `3px solid ${theme.palette.primary.main}`
                  : `1px solid ${theme.palette.grey[400]}`
              }
              borderRadius={1}
              m={1}
              p={1}
              width={72}
              justifyItems={'center'}
              alignItems={'center'}
              onMouseOver={() => setCurrentImage(index)}
              sx={{cursor: 'pointer'}}
            >
              <Image image={image} width={'98%'} />
            </Stack>
          )
        })}
      </Stack>
      <Stack border={1} borderRadius={2} p={2} sx={{maxWidth: media.lg ? 360 : 540}}>
        <Image image={product.images[currentImage]} width={'100%'} />
      </Stack>
    </Stack>
  )
}
