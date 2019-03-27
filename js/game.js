const Game = (function() {
	//cached box elements
	let boxEls = document.querySelectorAll('.box');
	let resetBtnEls = document.querySelectorAll('.reset-btn');
	let currentPlayerEl = document.querySelector('.current-player');
	let boardModalEl = document.querySelector('.board-modal');


	let state = {
		boxes: Array(9).fill(null),
		currentPlayer: 'X',
	};

	function handleBoxClick(evt) {
		let selBoxIndex = Number(evt.target.getAttribute('box-index'));
		let currentPlayer = state.currentPlayer;

		//only allow click updates if state of selected box is null (empty)
		if (state.boxes[selBoxIndex] === null) {
			state.boxes[selBoxIndex] = currentPlayer;
			this.classList.add(Utils.getPlayerClassName(currentPlayer));
			this.innerText = currentPlayer;
			//toggle to next player after state is updated
			updateToNextPlayer();
		}

		//check to see if game is finished (no more empty boxes)
		//if game is completed, add classname 'active' to boardModalEl
		if (Utils.isGameCompleted(state.boxes)) {
			boardModalEl.classList.add('active');
		}

	}

	function updateToNextPlayer() {
		let currentPlayer = state.currentPlayer;
		if (currentPlayer === Consts.playerType.default) {
			state.currentPlayer = Consts.playerType.secondary;
		} else {
			state.currentPlayer = Consts.playerType.default;
		}

		//update value of current player element value with new current player
		currentPlayerEl.innerText = state.currentPlayer;
	}

	function resetGameHandler(evt) {
		evt.stopPropagation();
		//update state.box values with null values and currentPlayer back to 'X'
		state.boxes = Array(9).fill(null);
		state.currentPlayer = Consts.playerType.default;
		//update text for all box elements back to empty string
		Utils.updateElementsTextValue(boxEls, '');
		Utils.updateElementsTextValue([currentPlayerEl], state.currentPlayer);

		//remove old value classes from box elements
		Utils.removeClassNames(boxEls, [Consts.className.xValue, Consts.className.oValue])

		//if board-modal is active, remove 'active' class
		if (boardModalEl.classList.contains('active')) {
			boardModalEl.classList.remove('active')
		}
		console.log('Game has been reset!');

	}

	function getState() {
		return {
			...state
		};
	}

	function init() {
		currentPlayerEl.innerText = state.currentPlayer;
		Utils.addClickHandlers(boxEls, handleBoxClick);
		Utils.addClickHandlers(resetBtnEls, resetGameHandler);
	}

	return {
		getState: getState,
		init: init
	};

}());