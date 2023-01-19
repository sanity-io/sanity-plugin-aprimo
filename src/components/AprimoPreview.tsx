import React from 'react'
import { AprimoCDNAsset } from '../schema/AprimoCDNAsset'
import ImagePreview from './ImagePreview'

type ComponentProps = {
  layout?: 'default' | 'block'
  value: AprimoCDNAsset
  title?: string
}

const AprimoPreview = ({ value: {rendition: {publicuri}}, layout }: ComponentProps) => {
  return <ImagePreview url={publicuri} layout={layout} />
}

export default AprimoPreview
