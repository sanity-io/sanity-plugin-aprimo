import React from 'react'

type ComponentProps = {
  layout?: 'default' | 'block'
  url: string | null
}

const ImagePreview = ({ layout, url }: ComponentProps) => {
  if (!url) {
    return <div />
  }
  return (
    <img
      alt="preview"
      src={url}
      style={{
        maxWidth: layout === 'default' ? '80px' : '100%',
        height: 'auto',
      }}
    />
  )
}

export default ImagePreview
