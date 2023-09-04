import {AprimoWidget} from '../components/AprimoWidget'
import {AprimoDiff} from '../components/AprimoDiff'

export const AprimoAssetSchema = {
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
      type: 'aprimo.additionalFile',
      name: 'additionalFile',
    },
  ],
  components: {
    input: AprimoWidget,
    diff: AprimoDiff,
    // preview: AprimoCDNPreview,
  },
}
