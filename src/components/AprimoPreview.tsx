import React from 'react'

type ComponentProps = {
  layout?: 'default' | 'block';
  value: Record<string, any>;
};

const AprimoPreview = ({value, layout}: ComponentProps) => {
  const url = value && value.rendition && value.rendition.publicuri
  if (!value || !url) {
    return null
  }
  return (
    <img
      alt='preview'
      src={url} 
      style={{
        maxWidth: layout === 'default' ? '80px' : '100%',
        height: 'auto',
      }}
    />
  )
}

export default AprimoPreview
