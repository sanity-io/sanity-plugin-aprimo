import React from 'react'
import {AprimoCDNAsset} from '../types'
import {Box} from '@sanity/ui'

type ComponentProps = {
  layout?: 'default' | 'block'
  value: AprimoCDNAsset
  title?: string
}

export const AprimoCDNPreview = ({value, layout = 'block'}: ComponentProps) => {
  const url = value?.rendition?.publicuri
  if (url) {
    return (
      <Box>
        <img
          alt={`preview for ${value?.title}`}
          src={url}
          style={{
            maxWidth: layout === 'block' ? '80px' : '100%',
            height: 'auto',
          }}
        />
      </Box>
    )
  }
  return null
}
