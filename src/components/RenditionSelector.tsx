import React, { FormEventHandler } from 'react'
import { Select } from '@sanity/ui'

type RenditionProps = {
  renditions: Record<string, any>
  changeRendition: FormEventHandler<HTMLSelectElement>
  currentRendition: Record<string, any> | undefined
}

export const RenditionSelector = ({
  renditions,
  changeRendition,
  currentRendition,
}: RenditionProps) => {
  const placeholder = (
    <option value="" disabled hidden key={0}>
      Select rendition...
    </option>
  )
  const renditionOptions = renditions.map((rendition: Record<string, any>, i: number) => (
    <option value={rendition?.id} key={i+1}>{rendition?.label}</option>
  ))

  let selectedRendition: Record<string, any> = { id: "" }
  if (currentRendition && renditions) {
    const foundRendition = renditions.find(
      (rendition: Record<string, any>) => rendition.id === currentRendition.id
    )
    if (foundRendition) {
      selectedRendition = foundRendition
    }
  }

  return (
    <Select onChange={changeRendition} value={selectedRendition.id}>
      {[placeholder, ...renditionOptions]}
    </Select>
  )
}
