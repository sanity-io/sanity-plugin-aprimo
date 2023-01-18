import React from 'react'
import { DiffFromTo, SchemaType } from '@sanity/field/diff'
import AprimoCDNPreview from './AprimoCDNPreview'

const AprimoDiff = ({
  diff,
  schemaType,
}: {
  diff: any
  schemaType: SchemaType
}) => {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={AprimoCDNPreview}
    />
  )
}

export default AprimoDiff
