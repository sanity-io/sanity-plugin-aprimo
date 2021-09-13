import React from 'react'
import ImagePreview from './ImagePreview'

type ComponentProps = {
  layout?: 'default' | 'block';
  value: Record<string, any>;
};

const AprimoCDNPreview = ({value, layout}: ComponentProps) => {
  const url = value && value.rendition && value.rendition.publicuri
  return <ImagePreview url={url} layout={layout} />
}

export default AprimoCDNPreview
