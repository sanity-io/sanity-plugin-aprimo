import React from 'react'
import ImagePreview from './ImagePreview'

type ComponentProps = {
  layout?: 'default' | 'block'
  value: AprimoAsset
  title?: string | null
}

const AprimoPreview = ({ value: {rendition: {publicuri}}, layout }: ComponentProps) => {
  return <ImagePreview url={publicuri} layout={layout} />
}

export default AprimoPreview
