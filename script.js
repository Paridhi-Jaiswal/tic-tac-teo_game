var yourPlayer,
	num,
	cell = document.querySelectorAll('.cell'),
	wrapper = document.querySelector('.wrapper'),
	span = document.querySelector('.doc span'),
	winingCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
// all the variables above


// event listener for each of the cell
cell.forEach(cellItem => {
	cellItem.addEventListener('click', handleClick)
})


// function to choose X or O
function chooseYourPlayer(c) {
	yourPlayer = c
	wrapper.style.display = 'none'
	span.innerHTML = isYou(true)
}


function isYou(boo) {
	if (boo) {
		return yourPlayer
	} else {
		if (yourPlayer == 'x') {
			return 'o'
		} else {
			return 'x'
		}
	}
}
// if is you, return the what you choose


// add hover affect on cell
cell.forEach(item => {
	item.addEventListener('mouseenter', () => {
		if (!(item.classList.contains('x') || item.classList.contains('o'))) {
			item.innerHTML = isYou(true)
			item.classList.add('h')
		}
	})
})

cell.forEach(item => {
	item.addEventListener('mouseout', () => {
		if (!(item.classList.contains('x') || item.classList.contains('o'))) {
			item.innerHTML = ''
			item.classList.remove('h')
		}
	})
})
// remove hover affcet on cell


// function to restart the cell
function restart() {
	wrapper.style.display = 'grid'
	cell.forEach(c => {
		c.innerHTML = ''
		c.classList.remove('x')
		c.classList.remove('o')
		c.disabled = false
	})
}


// function the reset the cells after a match
function resetCells() {
	cell.forEach(item => {
		item.innerHTML = ''
		item.disabled = false
	})
}

// function for the bot's turn
function botTurn() {
	cell.forEach(item => {
		item.disabled = true
	})
	span.innerHTML = isYou(false)
	setTimeout(() => {
		botChoice()
		cell.forEach(item => {
			item.disabled = false
		})
		span.innerHTML = isYou(true)
	}, 1500)
}


// function for bot to make a choice
function botChoice() {
	num = GenerateRandom()
	if (!(cell[num].classList.contains('x') || cell[num].classList.contains('o'))) {
		cell[num].innerHTML = isYou(false)
		cell[num].classList.add(isYou(false))
	} else {
		botChoice()
	}
}


// function to generate a random number
function GenerateRandom() {
	return Math.floor(Math.random() * 9)
}

// function to check is draw
function isDraw() {
	return [...cell].every(item => {
		return item.classList.contains(isYou(true)) || item.classList.contains(isYou(false))
	})
}


// to check is you win or lose
function isFinish(player) {
	return winingCombos.some(combo => {
		return combo.every(itemNum => {
			return cell[itemNum].classList.contains(player)
		})
	})
}


// function to use when click on the cell
function handleClick() {
	if (!(this.classList.contains('x') || this.classList.contains('o'))) {
		item = this
		item.disabled = true
		item.innerHTML = isYou(true)
		item.classList.add(isYou(true))
		item.classList.remove('h')
		if (isFinish(isYou(false))) {
			alert(`You lose against ${isYou(false)}`)
			resetCells()
			restart()
		} else if (isFinish(isYou(true))) {
			alert(`You win against ${isYou(false)}`)
			resetCells()
			restart()
		} else if (isDraw()) {
			alert(`It was a draw`)
			resetCells()
			restart()
		} else {
			botTurn()
		}
	}
}
