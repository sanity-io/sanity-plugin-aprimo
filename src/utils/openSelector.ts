    export default (tenantName: string, selectType: string) => {
			let assetType = 'asset'
			switch(selectType) {
				case 'singleRendition':
					assetType = 'asset rendition'
					break
				case 'multiple':
					assetType = 'assets'
					break
				default:
					assetType = 'asset'
			}

      const selectorOptions = {
        title: `Select ${assetType}`,
        description: `Select the ${assetType} you'd like to bring into this Sanity document`,
        accept: 'Use this asset',
        select: selectType
      }
      const encodedOptions = btoa(JSON.stringify(selectorOptions))
      window.open(`https://${tenantName}.dam.aprimo.com/dam/selectcontent#options=${encodedOptions}`, 'selector')
  }