import React, { useEffect, useState } from 'react'
import PatchEvent, { ObjectInputProps, set, unset } from 'sanity'
import {Box, Button, Card, Grid, Text} from '@sanity/ui'
import {PlugIcon} from '@sanity/icons'

import styled from 'styled-components'
import AprimoPreview from './AprimoPreview'

import { openSelector } from '../utils'
import { AprimoCDNAsset } from '../schema/AprimoCDNAsset'

const SetupButtonContainer = styled.div`
  position: relative;
  display: block;
  font-size: 0.8em;
  transform: translate(0%, -10%);
`
export interface AprimoConfig {
  tenantName: string
}

export interface AprimoCDNWidgetProps extends ObjectInputProps<AprimoCDNAsset> {
  pluginConfig: AprimoConfig
}

export const AprimoCDNWidget = (props: AprimoCDNWidgetProps) => {
  const { value, readOnly, onChange, pluginConfig } = props

  const removeValue = () => {
    //@ts-expect-error - PatchEvent.from is not typed correctly
    onChange(PatchEvent.from(unset()))
  }

  const [showSettings, setShowSettings] = useState(false)

  //this keeps track of which component is requesting an asset
  const [isLoading, setIsLoading] = useState(false)

  const setAsset = (asset: Record<string, any>) => {
    //@ts-expect-error - PatchEvent.from is not typed correctly
    onChange(PatchEvent.from(asset ? set(asset) : unset()))
  }

  useEffect(() => {
    const handleMessageEvent = async (event: MessageEvent) => {
      // Ensure only messages from the Aprimo Content Selector are handled
      if (
        pluginConfig &&
        event.origin === `https://${pluginConfig.tenantName}.dam.aprimo.com`
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
  }, [pluginConfig, isLoading])

  const action = (selectType: string) =>
    pluginConfig
      ? () => {
          setIsLoading(true)
          openSelector(pluginConfig.tenantName, selectType)
        }
      : () => setShowSettings(true)

  return (
    <div>
      {showSettings && (
        <Box padding={3}>
          <Card padding={4} radius={2} shadow={1} tone="caution">
            <Text>The tenant name has not been set in the configuration for the Aprimo plugin. Please add a tenant name.</Text>
          </Card>
        </Box>
      )}
        
      <div style={{ textAlign: 'center' }}>
        {value && <AprimoPreview value={value} />}
      </div>

      <Grid gap={1} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
        <Button
          disabled={readOnly}
          mode="ghost"
          title="Select an asset"
          kind="default"
          onClick={action('singlerendition')}
        >
          Select…
        </Button>
        <Button
          disabled={readOnly || !value}
          color="danger"
          mode="ghost"
          title="Remove asset"
          onClick={removeValue}
        >
          Remove
        </Button>
      </Grid>
    </div>
  )
}