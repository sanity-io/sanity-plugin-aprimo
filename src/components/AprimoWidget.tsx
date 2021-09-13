import React, { useEffect, useState } from 'react';
import PatchEvent, {
  set,
  unset,
} from 'part:@sanity/form-builder/patch-event'
import ButtonGrid from 'part:@sanity/components/buttons/button-grid'
import Button from 'part:@sanity/components/buttons/default'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import SetupIcon from 'part:@sanity/base/plugin-icon'
import { Marker } from '@sanity/types'
import styled from 'styled-components'
import AprimoCDNPreview from './AprimoCDNPreview'
import AprimoPreview from './AprimoPreview'
import { useSecrets } from 'sanity-secrets'
import SecretsConfigView, { Secrets, namespace } from './SecretsConfigView'

const SetupButtonContainer = styled.div`
  position: relative;
  display: block;
  font-size: 0.8em;
  transform: translate(0%, -10%);
`;

type Props = {
  type: Record<string, any>
  onChange: (patches: any) => void
  value: any | undefined
  level: number
  readOnly: boolean
  markers: Marker[]
  presence: any[]
};

const WidgetInput = (props: Props) => {

  const {
    value,
    type,
    markers,
    level,
    readOnly,
    presence,
    onChange
  } = props;

  const removeValue = () => {
    onChange(PatchEvent.from([unset()]));
  }

  const [showSettings, setShowSettings] = useState(false);
  const { secrets } = useSecrets<Secrets>(namespace);

  //this is how we'll keep track of which message to listen to
  const [isFetching, setIsFetching] = useState(false)

    const openSelector = (tenantName: string) => {
      setIsFetching(true)
      const selectorOptions = {
        title: 'Select asset',
        description: "Select the asset you'd like to bring into this Sanity document",
        accept: 'Use this asset',
        //TODO: multiple
        select: (type.name === 'aprimo.cdnasset') ? 'singlerendition' : 'single'
      }
      const encodedOptions = btoa(JSON.stringify(selectorOptions))
      window.open(`https://${tenantName}.dam.aprimo.com/dam/selectcontent#options=${encodedOptions}`, 'selector')
  }

  useEffect(() => {
    const handleMessageEvent = async (event: MessageEvent) => {
      if (!isFetching) {
        return
      }

      // Ensure only messages from the Aprimo Content Selector are handled
      if (secrets && event.origin === `https://${secrets.tenantName}.dam.aprimo.com`) {
        //if cancel, get out of fetching state
        if (event.data.result === 'cancel') {
          setIsFetching(false)
          return
        } else if (
          event.data.selection && 
          event.data.selection[0])  {
            setIsFetching(false)
            const newImage = event.data.selection[0]
            onChange(PatchEvent.from(newImage ? set(newImage) : unset()))
          }
      }
    }

    window.addEventListener('message', handleMessageEvent)
    //cleanup
    return () => window.removeEventListener("message", handleMessageEvent)

  }, [isFetching, onChange, secrets])

  const action = secrets 
    ? () => openSelector(secrets.tenantName)
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
          {
            (type.name == 'aprimo.cdnasset') ?  <AprimoCDNPreview value={value} /> : <AprimoPreview value={value} /> 
          }
        </div>

        <ButtonGrid align="start">
            <Button
              disabled={readOnly}
              inverted
              title="Select an asset"
              kind="default"
              onClick={action}
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
  );
}

export default WidgetInput;
