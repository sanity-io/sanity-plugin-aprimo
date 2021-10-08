import AprimoWidget from '../components/AprimoWidget'
import AprimoPreview from '../components/AprimoPreview'
import AprimoDiff from '../components/AprimoDiff'

export default {
  type: 'object',
  name: 'aprimo.asset',
  title: 'Aprimo Asset',
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
          name: 'id',
        },
        {
          type: 'boolean',
          name: 'isManual',
        },
        {
          type: 'string',
          name: 'label',
        },
        {
          type: 'number',
          name: 'fileSize',
        },
        {
          type: 'string',
          name: 'fileName',
        },
        {
          type: 'string',
          name: 'extension',
        },
        {
          type: 'string',
          name: 'tag',
        },
        {
          type: 'object',
          name: 'metadata',
          fields: [
            {
              type: 'string',
              name: 'isCroppedImage',
            },
            {
              type: 'string',
              name: 'x',
            },
            {
              type: 'string',
              name: 'y',
            },
            {
              type: 'string',
              name: 'cropWidth',
            },
            {
              type: 'string',
              name: 'cropHeight',
            },
            {
              type: 'string',
              name: 'resizeWidth',
            },
            {
              type: 'string',
              name: 'resizeHeight',
            },
            {
              type: 'string',
              name: 'resolution',
            },
            {
              type: 'string',
              name: 'colorspace',
            },
            {
              type: 'string',
              name: 'resizeFormat',
            },
            {
              type: 'string',
              name: 'presetName',
            },
            {
              type: 'string',
              name: 'presetHash',
            },
            {
              type: 'string',
              name: 'isSmart',
            },
            {
              type: 'string',
              name: 'isPreset',
            },
            {
              type: 'string',
              name: 'correlationId',
            },
          ],
        },
      ],
    },
  ],
  inputComponent: AprimoWidget,
  component: AprimoPreview,
  diffComponent: AprimoDiff,
  preview: {
    select: {
      id: 'id',
    },
    prepare({ id }: any) {
      return { id }
    },
    component: AprimoPreview,
  },
}
