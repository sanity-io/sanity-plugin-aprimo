import React, { useEffect, useState } from 'react'
import { useSecrets } from 'sanity-secrets'
import { setAuthToken } from '../utils/auth'
import { Secrets, namespace } from './SecretsConfigView'
import ImagePreview from './ImagePreview'

type ComponentProps = {
  layout?: 'default' | 'block';
  value: Record<string, any>;
  title?: string | null;
};

const getPreviewUrl = async (
  secrets: Secrets | undefined,
  token: string,
  recordId: string) => {
  
  if (secrets && secrets.tenantName && token && recordId) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'select-record': 'preview',
      'API-Version': '1'
    }

    return fetch(`https://${secrets.tenantName}.dam.aprimo.com/api/core/record/${recordId}`, { 
      headers 
    })
      .then(res => res.json())
  } else {
    return ''
  }
}

const AprimoPreview = ({value, layout}: ComponentProps) => {
  const { secrets } = useSecrets<Secrets>(namespace);
  const [url, setUrl] = useState(null)
  const [token, setToken] = useState<string | null>(null)
  // //TODO: do a video for videos?
  // const contentType = 'image'

  useEffect(() => {
    const fetchToken = async () => {
      let token = localStorage.getItem('aprimoToken') as string
      if (!token && secrets) {
        await setAuthToken(secrets)
        token = localStorage.getItem('aprimoToken') as string
      }
      setToken(token)
    }

    fetchToken()
  }, [value, secrets])

  useEffect(() => {
    const fetchUrl = async () => {
      if (token && secrets) {
        try {
          const recordInfo = await getPreviewUrl(secrets, token, value.id)
          const previewUrl = recordInfo._embedded.preview.uri
          //TODO: do something for vid
          // const contentType = recordInfo.contentType
          setUrl(previewUrl)
        } 
        //thrown for 401
        catch (e) {
          //reset the token, which will rerun this callback
          await setAuthToken(secrets)
          const token = localStorage.getItem('aprimoToken') as string
          setToken(token)
        }
      }
    }
    fetchUrl()
  }, [value, secrets, token])

  return <ImagePreview url={url} layout={layout} />
}

export default AprimoPreview
