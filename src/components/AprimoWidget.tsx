import React, { useEffect, useState } from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
//TODO: pjut all these in sanity-ui
import ButtonGrid from 'part:@sanity/components/buttons/button-grid'
import Button from 'part:@sanity/components/buttons/default'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import SetupIcon from 'part:@sanity/base/plugin-icon'
import { Marker } from '@sanity/types'

import styled from 'styled-components'
import AprimoPreview from './AprimoPreview'
import { useSecrets } from 'sanity-secrets'
import { nanoid } from 'nanoid'

import SecretsConfigView, { Secrets, namespace } from './SecretsConfigView'
import { openSelector, setAuthToken, getRenditions } from '../utils'
import { RenditionSelector } from './RenditionSelector'

const SetupButtonContainer = styled.div`
  position: relative;
  display: block;
  font-size: 0.8em;
  transform: translate(0%, -10%);
`

type Props = {
  type: Record<string, any>
  onChange: (patches: any) => void
  value: any | undefined
  level: number
  readOnly: boolean
  markers: Marker[]
  presence: any[]
}

const AprimoWidget = (props: Props) => {
  const { value, type, markers, level, readOnly, presence, onChange } = props

  const removeValue = () => {
    onChange(PatchEvent.from([unset()]))
    setRenditions([])
  }

  const [showSettings, setShowSettings] = useState(false)

  //this keeps track of which component is requesting an asset
  const [isLoading, setIsLoading] = useState(false)

  const { secrets } = useSecrets<Secrets>(namespace)
  const [token, setToken] = useState<string | null>(null)
  const [renditions, setRenditions] = useState<Record<string, any>[]>([])

  const setAsset = (asset: Record<string, any>) => {
    asset._key = value && value._key ? value._key : nanoid()
    asset._type = type.name
    onChange(PatchEvent.from(asset ? set(asset) : unset()))
  }

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
    const handleMessageEvent = async (event: MessageEvent) => {
      // Ensure only messages from the Aprimo Content Selector are handled
      if (
        secrets &&
        event.origin === `https://${secrets.tenantName}.dam.aprimo.com`
      ) {
        //if cancel, get out of fetching state
        if (event.data.result === 'cancel') {
          setIsLoading(false)
          return
        } else if (
          event.data.selection &&
          event.data.selection[0] &&
          isLoading
        ) {
          setAsset(event.data.selection[0])
          setIsLoading(false)
        }
      }
    }

    window.addEventListener('message', handleMessageEvent)
    //cleanup
    return () => window.removeEventListener('message', handleMessageEvent)
  }, [secrets, isLoading])

  useEffect(() => {
    const fetchRenditions = async () => {
      if (token && secrets && value && value.id) {
        try {
          const renditions = await getRenditions(secrets, token, value.id)
          setRenditions(renditions)
        } catch (e) {
          //thrown for 401
          //reset the token, which will rerun this callback
          await setAuthToken(secrets)
          const token = localStorage.getItem('aprimoToken') as string
          setToken(token)
        }
      }
    }
    fetchRenditions()
  }, [value, secrets, token])

  const action = (selectType: string) =>
    secrets
      ? () => {
          setIsLoading(true)
          openSelector(secrets.tenantName, selectType)
        }
      : () => setShowSettings(true)

  const changeRendition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event && event.currentTarget && event.currentTarget.value) {
      const renditionId = event.currentTarget.value
      const renditionObj = renditions.find(
        (rendition: Record<string, any>) => rendition.id === renditionId
      )
      const newVal = { ...value, ...{ rendition: renditionObj } }
      onChange(PatchEvent.from(newVal ? set(newVal) : unset()))
    }
  }

  return (
    <div>
      {showSettings && (
        <SecretsConfigView onClose={() => setShowSettings(false)} />
      )}
      <SetupButtonContainer>
        <Button
          color="primary"
          icon={SetupIcon}
          kind="simple"
          title="Configure"
          tabIndex={1}
          onClick={() => setShowSettings(true)}
        />
      </SetupButtonContainer>
      <Fieldset
        markers={markers}
        presence={presence}
        legend={type.title}
        description={type.description}
        level={level}
      >
        <div style={{ textAlign: 'center' }}>
          <AprimoPreview value={value} />
        </div>

        <ButtonGrid align="start">
          <Button
            disabled={readOnly}
            inverted
            title="Select an asset"
            kind="default"
            onClick={action('single')}
          >
            Select…
          </Button>
          <Button
            disabled={readOnly || !value}
            color="danger"
            inverted
            title="Remove asset"
            onClick={removeValue}
          >
            Remove
          </Button>
        </ButtonGrid>
        {value && (
          <RenditionSelector
            changeRendition={changeRendition}
            renditions={renditions}
            currentRendition={value && value.rendition}
          />
        )}
      </Fieldset>
    </div>
  )
}

export default AprimoWidget
