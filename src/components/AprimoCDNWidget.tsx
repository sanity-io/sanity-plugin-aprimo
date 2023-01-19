import React, {useCallback, useEffect, useState} from 'react'
import {PatchEvent, ObjectInputProps, set, unset} from 'sanity'
import {Box, Button, Card, Grid, Text} from '@sanity/ui'

import {AprimoCDNPreview} from './AprimoCDNPreview'

import {openSelector} from '../utils'
import {AprimoCDNAsset} from '../schema/AprimoCDNAsset'

export interface AprimoConfig {
  tenantName: string
}

export interface AprimoCDNWidgetProps extends ObjectInputProps<AprimoCDNAsset> {
  pluginConfig: AprimoConfig
}

export const AprimoCDNWidget = (props: AprimoCDNWidgetProps) => {
  const {value, readOnly, onChange, pluginConfig} = props

  const _key = value?._key
  const removeValue = () => {
    onChange(PatchEvent.from(unset()))
  }

  //this keeps track of which component is requesting an asset
  const [isLoading, setIsLoading] = useState(false)

  const setAsset = (asset: Record<string, any>) => {
    onChange(PatchEvent.from(asset ? set(asset) : unset()))
  }

  useEffect(() => {
    const handleMessageEvent = async (event: MessageEvent) => {
      // Ensure only messages from the Aprimo Content Selector are handled
      if (pluginConfig && event.origin === `https://${pluginConfig.tenantName}.dam.aprimo.com`) {
        //if cancel, get out of fetching state
        if (event.data.result === 'cancel') {
          setIsLoading(false)
          return
        } else if (event.data.selection && event.data.selection[0] && isLoading) {
          if (_key) {
            setAsset({...event.data.selection[0], _key})
          } else {
            setAsset(event.data.selection[0])
          }
          setIsLoading(false)
        }
      }
    }

    window.addEventListener('message', handleMessageEvent)
    //cleanup
    return () => window.removeEventListener('message', handleMessageEvent)
  }, [pluginConfig, isLoading, _key])

  const action = useCallback(
    (selectType: string) => () => {
      setIsLoading(true)
      openSelector(pluginConfig.tenantName, selectType)
    },
    [pluginConfig.tenantName]
  )

  if (!pluginConfig || !pluginConfig.tenantName) {
    return (
      <Box padding={3}>
        <Card padding={4} radius={2} shadow={1} tone="caution">
          <Text>
            The tenant name has not been set in the configuration for the Aprimo plugin. Please add
            a tenant name.
          </Text>
        </Card>
      </Box>
    )
  }

  return (
    <div>
      <div style={{textAlign: 'center'}}>{value && <AprimoCDNPreview value={value} />}</div>

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
