import React from 'react'
import {definePlugin, isObjectInputProps, SchemaType} from 'sanity'
import {AprimoWidget} from './components/AprimoWidget'
import {AprimoCDNAssetSchema} from './schema/AprimoCDNAsset'
import {AprimoAdditionalFileSchema} from './schema/additionalFile'
import {AprimoAssetSchema} from './schema/AprimoAsset'
import {AprimoCDNAsset, AprimoConfig} from './types'

export const aprimoPlugin = definePlugin((config: Partial<AprimoConfig>) => {
  const reqConfig: AprimoConfig = {
    tenantName: '',
    ...config,
  }

  return {
    name: 'aprimo-assets',
    schema: {
      types: [AprimoCDNAssetSchema, AprimoAdditionalFileSchema, AprimoAssetSchema],
    },
    form: {
      components: {
        input: (props) => {
          if (
            isObjectInputProps(props) &&
            (isType(props.schemaType, AprimoCDNAssetSchema.name) ||
              isType(props.schemaType, AprimoAssetSchema.name))
          ) {
            return (
              <AprimoWidget
                {...props}
                value={props.value as AprimoCDNAsset}
                pluginConfig={reqConfig}
              />
            )
          }
          //add array check here to render the widget in array
          return props.renderDefault(props)
        },
      },
    },
  }
})

function isType(schemaType: SchemaType, name: string): boolean {
  if (schemaType.name === name) {
    return true
  }
  if (schemaType.type) {
    return isType(schemaType.type, name)
  }
  return false
}
