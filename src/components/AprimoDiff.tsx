import React from 'react';
import { DiffFromTo } from '@sanity/field/diff';

const AprimoDiffPreview = ({value}
  : {value: AprimoAsset}) => {
  const url = value && value.rendition && value.rendition.publicuri
  if (!value || !url) {
    return null
  }

  return (
    <img alt='preview' src={url} style={{ maxWidth: '100%', height: 'auto' }} />
  )
}

const AprimoDiff = ({diff, schemaType}
: {diff: any, schemaType: any}) => {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={AprimoDiffPreview}
    />
  )
}

export default AprimoDiff
