type AprimoAssetRendition = {
  id: string
  publicuri: string
}

type AprimoAsset = {
  id: string
  title: string
  rendition: AprimoAssetRendition
}

declare module 'part:@sanity/components/buttons/button-grid'
declare module 'part:@sanity/components/buttons/default'
declare module 'part:@sanity/components/fieldsets/default'
declare module 'part:@sanity/base/plugin-icon'
declare module 'part:@sanity/components/formfields/default'
declare module 'part:@sanity/form-builder/patch-event'