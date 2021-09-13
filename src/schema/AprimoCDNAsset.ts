import AprimoWidget from '../components/AprimoWidget'
// import AprimoCDNPreview from '../components/AprimoCDNPreview'
import AprimoDiff from '../components/AprimoDiff'
import AprimoCDNPreview from '../components/AprimoCDNPreview'

export default {
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
      ]
    },
  ],
  inputComponent: AprimoWidget,
  component: AprimoCDNPreview,
  diffComponent: AprimoDiff,
  //TODO: preview will likely become necessary with multiple preview type

  // preview: {
  //   select: {
  //     url: 'rendition.publicuri',
  //   },
  //   prepare({url}: any) {
  //   },
  //   component: AprimoPreview,
  // },
}
