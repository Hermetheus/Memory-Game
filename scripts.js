const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	console.log('I am flipped');
	console.log(this);
	this.classList.toggle('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;

		console.log(hasFlippedCard, firstCard);

		return;
	}
	hasFlippedCard = false;
	secondCard = this;

	console.log({ firstCard, secondCard });
	checkForMatch();
	// console.log(firstCard.dataset.framework);
}

function checkForMatch() {
	// if (firstCard.dataset.framework === secondCard.dataset.framework) {
	// 	disableCards();
	// } else {
	// 	unflipCards();
	// }

	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));
