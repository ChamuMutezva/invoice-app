import React, { createContext, useState } from "react";
import { OverlayTypes } from "./Types";

const defaultState = {
	overlayControl: false,
	onChangeOverlay: () => true,
};

export const OverLayContext = createContext<OverlayTypes>(defaultState);

export function OverlayProvider(props: { children: any }) {
	const [overlayControl, setOverlay] = useState(defaultState.overlayControl);
	function onChangeOverlay() {
		return setOverlay(!overlayControl);
	}
	return (
		<OverLayContext.Provider value={{ overlayControl, onChangeOverlay }}>
			{props.children}
		</OverLayContext.Provider>
	);
}
