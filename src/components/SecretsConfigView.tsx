import React from 'react'
import { SettingsView } from 'sanity-secrets'

export type Secrets = {
  tenantName: string
  //these will be used for auth requests, in 'single' and 'multiple' modes through the proxy
  userName: string
  token: string
}

const pluginConfigKeys = [
  {
    key: 'tenantName',
    title: 'Tenant name',
    description: 'The name of your tenant on Aprimo. When logging in in your browser, you can usually find it by looking at the URL, e.g., {TENANT_NAME}.dam.aprimo.com',
  },
  {
    key: 'userName',
    title: 'User Name',
    description: 'The user that will be used for accessing Aprimo in your studio',
  },
  {
    key: 'token',
    title: 'Token',
    description: "This user's token, usually given to you by Aprimo.",
  },
  {
    key: 'clientId',
    title: 'Client ID',
    description: "This user's Client ID, usually given to you by Aprimo.",
  },
];

export const namespace = 'aprimo'

type Props = {
  onClose: () => void;
};

const SecretsConfigView = (props: Props) => {
  return (
    <SettingsView
      title="Aprimo config"
      namespace={namespace}
      keys={pluginConfigKeys}
      onClose={props.onClose}
    />
  );
};

export default SecretsConfigView;
