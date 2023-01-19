import React from 'react'
import {AprimoCDNPreview} from '../components/AprimoCDNPreview'
import {AprimoCDNWidget} from '../components/AprimoCDNWidget'
import {AprimoDiff} from '../components/AprimoDiff'

export interface AprimoCDNAsset {
  id: string
  title: string
  rendition: {
    id: string
    publicuri: string
  }
  _key?: string
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
  components: {
    input: AprimoCDNWidget,
    diff: AprimoDiff,
    // preview: AprimoCDNPreview,
  },
  preview: {
    select: {
      url: 'rendition.publicuri',
      title: 'title',
    },
    prepare({url, title}: {url: string; title: string}) {
      return {
        title,
        media: <img src={url} style={{height: '100%', width: '100%'}} />,
      }
    },
  },
}
