export const openSelector = (tenantName: string, selectType: string) => {
	let assetType = 'asset'
	switch(selectType) {
		case 'singlerendition':
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
		accept: `Use ${assetType}`,
		select: selectType
	}

	const encodedOptions = btoa(JSON.stringify(selectorOptions))
	window.open(`https://${tenantName}.dam.aprimo.com/dam/selectcontent#options=${encodedOptions}`, 'selector')

}
