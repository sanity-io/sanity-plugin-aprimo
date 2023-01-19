import React from 'react'
import {DiffFromTo, SchemaType} from 'sanity'
import {AprimoCDNPreview} from './AprimoCDNPreview'

export const AprimoDiff = ({diff, schemaType}: {diff: any; schemaType: SchemaType}) => {
  return <DiffFromTo diff={diff} schemaType={schemaType} previewComponent={AprimoCDNPreview} />
}
