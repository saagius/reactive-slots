export function getBrowserVisibilityProp() {
	if (typeof (document as any).msHidden !== 'undefined') {
		return 'msvisibilitychange';
	} else if (typeof (document as any).webkitHidden !== 'undefined') {
		return 'webkitvisibilitychange';
	}

	return 'visibilitychange';
}

export function getBrowserDocumentHiddenProp() {
	if (typeof (document as any).msHidden !== 'undefined') {
		return 'msHidden';
	} else if (typeof (document as any).webkitHidden !== 'undefined') {
		return 'webkitHidden';
	}

	return 'hidden';
}

export function getIsDocumentHidden() {
	return !(document as any)[getBrowserDocumentHiddenProp()];
}
