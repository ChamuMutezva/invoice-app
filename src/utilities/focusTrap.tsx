// Focus trap implementation inspired by Tediko from his solution - see link below

import { MouseEventHandler } from "react";

// https://www.frontendmentor.io/solutions/invoice-app-reactjs-styledcomponents-framer-motion-webpack-WVGeS4ShF

const focusTrap = (
	event: {
		key: string;
		shiftKey: any;
		preventDefault: () => void;
	},
	toggleOverlay: MouseEventHandler<HTMLButtonElement>,
	targetElement: { current: { querySelectorAll: (arg0: string) => any } }
) => {
	if (event.key === "Escape") return toggleOverlay;
	if (event.key !== "Tab") return;

	const formElements =
		targetElement.current.querySelectorAll("button, a, input");
	const firstElement = formElements[0];
	const lastElement = formElements[formElements.length - 1];

	// if going forward by pressing tab and lastElement is active shift focus to first focusable element
	if (!event.shiftKey && document.activeElement === lastElement) {
		event.preventDefault();
		firstElement.focus();
	}

	// if going backward by pressing tab and firstElement is active shift focus to last focusable element
	if (event.shiftKey && document.activeElement === firstElement) {
		event.preventDefault();
		lastElement.focus();
	}
};

export default focusTrap;
