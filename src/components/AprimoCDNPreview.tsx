import React from 'react'
import {AprimoCDNAsset} from '../types'
import {Box} from '@sanity/ui'

type ComponentProps = {
  layout?: 'default' | 'block'
  value: AprimoCDNAsset
  title?: string
}

export const AprimoCDNPreview = ({value, layout}: ComponentProps) => {
  const url = value?.rendition?.publicuri
  if (url) {
    return (
      <Box>
        <img
          alt="preview"
          src={url}
          style={{
            maxWidth: layout === 'default' ? '80px' : '100%',
            height: 'auto',
          }}
        />
      </Box>
    )
  }
  return null
}
