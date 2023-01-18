import React from 'react'
import { SettingsView } from 'sanity-secrets'

export type Secrets = {
  tenantName: string
}

const pluginConfigKeys = [
  {
    key: 'tenantName',
    title: 'Tenant name',
    description:
      'The name of your tenant on Aprimo. When logging in in your browser, you can usually find it by looking at the URL, e.g., {TENANT_NAME}.dam.aprimo.com',
  },
]

export const namespace = 'aprimo'

type Props = {
  onClose: () => void
}

const SecretsConfigView = (props: Props) => {
  return (
    <SettingsView
      title="Aprimo config"
      namespace={namespace}
      keys={pluginConfigKeys}
      onClose={props.onClose}
    />
  )
}

export default SecretsConfigView
