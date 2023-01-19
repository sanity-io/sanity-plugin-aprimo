import { AprimoCDNWidget } from '../components/AprimoCDNWidget'
import AprimoDiff from '../components/AprimoDiff'
import AprimoCDNPreview from '../components/AprimoCDNPreview'

export interface AprimoCDNAsset {
  id: string
  title: string
  rendition: {
    id: string
    publicuri: string
  }
}

export const AprimoCDNAssetSchema = {
  type: 'object',
  name: 'aprimo.cdnasset',
  title: 'Aprimo CDN Asset',
  fields: [
    {
      type: 'string',
      name: 'id',
    },
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'object',
      name: 'rendition',
      fields: [
        {
          type: 'string',
          name: 'publicuri',
        },
      ],
    },
  ],
  inputComponent: AprimoCDNWidget,
  diffComponent: AprimoDiff,
  preview: {
    select: {
      url: 'rendition.publicuri',
    },
    prepare({ url }: any) {
      return {
        rendition: { publicuri: url },
      }
    },
    component: AprimoCDNPreview,
  },
}
