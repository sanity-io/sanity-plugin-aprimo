import {Card, Box, Flex, Stack, Text, Label, Button} from '@sanity/ui'
import {AprimoAsset} from '../types'

export const AprimoFilePreview = ({value}: {value: AprimoAsset}) => {
  return (
    <Box paddingX={1}>
      <Card paddingY={3} paddingX={3} radius={1} shadow={1}>
        <Flex align="center" justify="space-between" gap={1}>
          <Stack space={3}>
            <Label as="p">Aprimo Asset</Label>
            <Text as="p">Value here!</Text>
          </Stack>
          <Stack>
            {/* ADD launch icon */}
            <Button tone="primary" text="Sync" disabled />
          </Stack>
        </Flex>
      </Card>
    </Box>
  )
}
