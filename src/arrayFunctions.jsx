import React, { useEffect, useState } from 'react';
import Button from 'part:@sanity/components/buttons/default';
import PatchEvent, {
  setIfMissing,
  insert,
} from 'part:@sanity/form-builder/patch-event';
import DefaultArrayFunctions from 'part:@sanity/form-builder/input/array/functions-default';

import { useSecrets } from 'sanity-secrets';
import SecretsConfigView, { namespace } from './components/SecretsConfigView';
import aprimoAsset from './schema/AprimoAsset';
import openSelector from './utils/openSelector';

const AssetListFunctions = props => {
  const { secrets, loading } = useSecrets(namespace);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const aprimoAssetType = props.type.of.find(
    t => t.name === aprimoAsset.name
  );
  
  const { onCreateValue, onChange } = props;

  const setAssets = (assets) => {
    const items = assets.map(asset => 
      Object.assign(
        {},
        asset,
        {
          // Schema version. In case we ever change our schema.
          _version: 1,
        },
        onCreateValue(aprimoAssetType)
      )
    )
    onChange(PatchEvent.from(setIfMissing([]), insert(items, 'after', [-1])));
  }

  useEffect(() => {
    const handleMessageEvent = async (event) => {
      // Ensure only messages from the Aprimo Content Selector are handled
      if (secrets && event.origin === `https://${secrets.tenantName}.dam.aprimo.com`) {
        if (event.data.result === 'cancel') {
          setIsLoading(false)
          return
        } else if (event.data.selection && isLoading)  {
          setIsLoading(false)
          setAssets(event.data.selection)
      }
    }
	}

    window.addEventListener('message', handleMessageEvent)
    //cleanup
    return () => window.removeEventListener("message", handleMessageEvent)

  }, [secrets, isLoading])


  const actions = (
    <>
      <Button
        enabled={props.readOnly !== true && !loading}
        inverted
        onClick={() => {
          setIsLoading(true)
          openSelector(
            secrets.tenantName,
						'multiple'
          )
        }}
      >
        Add multiple
      </Button>
      <Button onClick={() => setShowSettings(true)}>Configure</Button>
    </>
  );

  return (
    <>
      {showSettings && (
        <SecretsConfigView onClose={() => setShowSettings(false)} />
      )}
      <DefaultArrayFunctions {...props}>
        {aprimoAssetType && actions}
      </DefaultArrayFunctions>
    </>
  );
};

export default AssetListFunctions;
