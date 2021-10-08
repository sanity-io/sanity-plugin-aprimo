import React from 'react'
import { DiffFromTo, SchemaType } from '@sanity/field/diff'
import AprimoCDNPreview from './AprimoCDNPreview'
import AprimoPreview from './AprimoPreview'

const findPreviewComponent = (schemaName: string) => {
  switch (schemaName) {
    case 'aprimo.cdnasset':
      return AprimoCDNPreview
    case 'aprimo.asset':
      return AprimoPreview
    default:
      return () => <div />
  }
}

const AprimoDiff = ({
  diff,
  schemaType,
}: {
  diff: any
  schemaType: SchemaType
}) => {
  console.log('diffFromTo', DiffFromTo)
  const previewComponent = findPreviewComponent(schemaType.name)
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={previewComponent}
    />
  )
}

export default AprimoDiff
