import type {ProductDetails} from '../Product'
import React, {useState} from 'react'
import type {StackProps} from '@mui/material'
import {Stack, styled} from '@mui/material'
import {Image} from '../../../atoms'
import theme from '../../../../theme/theme'
import {useMedia} from '../../../../hooks'

const ThumbnailContainer = styled(Stack)<StackProps & {active?: 'true' | 'false'}>(({theme, active}) => ({
  border: active === 'true' ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.grey[400]}`,
  width: theme.spacing(7),
  padding: '2px'
}))

export const ProductImageWithThumbnails: React.FC<{product: ProductDetails}> = ({product}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const media = useMedia()

  const handleImageUpdate = (index: number) => () => {
    setCurrentImage(index)
  }

  return (
    <Stack direction={media.xl ? 'column-reverse' : 'row'} spacing={2} alignItems={media.md ? 'center' : 'start'}>
      <Stack direction={media.xl ? 'row' : 'column'} flexWrap={'wrap'}>
        {product.images.map((image, index) => {
          return (
            <ThumbnailContainer
              key={`image-${index}`}
              active={currentImage === index ? 'true' : 'false'}
              onMouseOver={handleImageUpdate(index)}
            >
              <Image image={image} width={'98%'} />
            </ThumbnailContainer>
          )
        })}
      </Stack>
      <Stack border={`1px solid ${theme.palette.grey[400]}`} sx={{maxWidth: media.lg ? 360 : 540}}>
        <Image image={product.images[currentImage]} width={'100%'} />
      </Stack>
    </Stack>
  )
}
