import AprimoWidget from '../components/AprimoWidget'
import AprimoPreview from '../components/AprimoPreview'
import AprimoDiff from '../components/AprimoDiff'

export default {
  type: 'object',
  name: 'aprimo.asset',
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
  component: AprimoPreview,
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
