//Utils module with helper functions
const Utils = (function() {

	function isGameCompleted(boxes) {
	  return boxes.every((box) => {
	  	return box !== null;
	  });			
	}

	function addClickHandlers(elements, handler) {
		for (let i=0; i<elements.length; i++) {
			elements[i].addEventListener('click', handler);
		}
	}

	function updateElementsTextValue(elements, textValue) {
		for (let i=0; i<elements.length; i++) {
			elements[i].innerText = textValue;
		}			
	}

	function removeClassNames(elements, classNames) {
		for (let i=0; i<elements.length; i++) {
			elements[i].classList.remove(...classNames);
		}			
	}		

	function getPlayerClassName(player) {
		if (!player) return '';
		switch (player.toUpperCase()) {
			case 'X':
				return Consts.className['xValue'];
			case 'O':
				return Consts.className['oValue'];
			default:
				return '';
		}
	}

	return {
		isGameCompleted: isGameCompleted,
		addClickHandlers: addClickHandlers,
		updateElementsTextValue: updateElementsTextValue,
		getPlayerClassName: getPlayerClassName,
		removeClassNames: removeClassNames,
	};

}());