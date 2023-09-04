import React from 'react'
import {AprimoWidget} from '../components/AprimoWidget'
import {AprimoDiff} from '../components/AprimoDiff'

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
    input: AprimoWidget,
    diff: AprimoDiff,
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
