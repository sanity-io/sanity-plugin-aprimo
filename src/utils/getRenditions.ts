import { Secrets } from '../components/SecretsConfigView'

export const getRenditions = (
  secrets: Secrets | undefined,
  token: string,
  recordId: string
) =>
  fetch(
    `https://${secrets?.tenantName}.dam.aprimo.com/api/core/record/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-Version': '1',
        'select-record': 'masterfilelatestversion',
        'select-fileversion': 'additionalfiles',
        'select-additionalfile': 'metadata, uri',
      },
    }
  )
    .then(res => res.json())
    .then(res =>
      res._embedded.masterfilelatestversion._embedded.additionalfiles.items
        .filter((file: Record<string, any>) => !file.metadata.isCropPreview)
        .map((file: Record<string, any>) => {
          //remove links for rendundancy and URI because contains temp token
          const { _links, uri, ...cleanFile } = file
          return cleanFile
        })
    )
