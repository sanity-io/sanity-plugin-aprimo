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
import { openSelector } from '../utils'

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

const AprimoCDNWidget = (props: Props) => {
  const { value, type, markers, level, readOnly, presence, onChange } = props

  const removeValue = () => {
    onChange(PatchEvent.from([unset()]))
  }

  const [showSettings, setShowSettings] = useState(false)

  //this keeps track of which component is requesting an asset
  const [isLoading, setIsLoading] = useState(false)

  const { secrets } = useSecrets<Secrets>(namespace)

  const setAsset = (asset: Record<string, any>) => {
    asset._key = value && value._key ? value._key : nanoid()
    onChange(PatchEvent.from(asset ? set(asset) : unset()))
  }

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
  }, [secrets, isLoading, setAsset])

  const action = (selectType: string) =>
    secrets
      ? () => {
          setIsLoading(true)
          openSelector(secrets.tenantName, selectType)
        }
      : () => setShowSettings(true)

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
            onClick={action('singlerendition')}
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
      </Fieldset>
    </div>
  )
}

export default AprimoCDNWidget
