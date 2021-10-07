import { Secrets } from '../components/SecretsConfigView'

//since non-CDN assets don't have URLs, we have to get them at render, and must be authenticated
//(alternative is fetching that data once and storing either the token for preview or the preview data itself
//in the studio)

export const setAuthToken = async (secrets: Secrets | undefined) => {
  //TODO: better error/missing secrets flow
  if (!secrets) {
    return
  }

  const base64secret = btoa(`${secrets.userName}:${secrets.token}`)
  const headers = {
    'Client-id': secrets.clientId || '',
    'Content-type': 'application/json',
    Authorization: `Basic ${base64secret}`,
    'X-URL': `https://${secrets.tenantName}.aprimo.com/api/oauth/create-native-token`,
  }
  return fetch(secrets.proxy, {
    method: 'POST',
    headers,
  })
    .then(res => res.json())
    .then(res => res.accessToken)
    .then(res => localStorage.setItem('aprimoToken', res))
}
