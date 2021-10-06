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
      ]
    },
  ],
  inputComponent: AprimoWidget,
  component: AprimoPreview,
  diffComponent: AprimoDiff,
  preview: {
    select: {
      id: 'id',
    },
    prepare({id}: any) {
      return { id }
    },
    component: AprimoPreview,
  }
}
