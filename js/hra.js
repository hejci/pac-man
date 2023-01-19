document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.getElementById('score')
    // velikost hrací plochy
    const width = 28
    let score = 0
    const grid = document.querySelector('.grid')
    // rozložení hrací plochy
    const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    // 0 - tečky
    // 1 - stěny
    // 2 - domeček duchů
    // 3 - speciální tečky
    // 4 - prázdné místa
  
    const squares = []
  
    // hrací plocha
    function createBoard() {
      for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
  
        // rozložení objektů na plochu
        if(layout[i] === 0) {
          squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
          squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
          squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
          squares[i].classList.add('power-pellet')
        }
      }
    }
    createBoard()
  
  
    // vytvoření postav
    //vykreslení pacmana
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add('pac-man')
  
    //pohyb pacmana
    function movePacman(e) {
      squares[pacmanCurrentIndex].classList.remove('pac-man')
      switch(e.keyCode) {
        case 37:
          if(
            pacmanCurrentIndex % width !== 0 &&
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
            )
          pacmanCurrentIndex -= 1
          if (squares[pacmanCurrentIndex -1] === squares[363]) {
            pacmanCurrentIndex = 391
          }
          break
        case 38:
          if(
            pacmanCurrentIndex - width >= 0 &&
            !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
            !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
            ) 
          pacmanCurrentIndex -= width
          break
        case 39:
          if(
            pacmanCurrentIndex % width < width - 1 &&
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
          )
          pacmanCurrentIndex += 1
          if (squares[pacmanCurrentIndex +1] === squares[392]) {
            pacmanCurrentIndex = 364
          }
          break
        case 40:
          if (
            pacmanCurrentIndex + width < width * width &&
            !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
            !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
          )
          pacmanCurrentIndex += width
          break
      }
      squares[pacmanCurrentIndex].classList.add('pac-man')
      pacDotEaten()
      powerPelletEaten()
      checkForGameOver()
      checkForWin()
    }
    document.addEventListener('keyup', movePacman)
  
    // přičítání skóre při snězení tečky
    function pacDotEaten() {
      if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
      }
    }
  
    // speciální tečka
    function powerPelletEaten() {
      if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
      }
    }
  
    // konec blikání duchů po konci efektu speciální tečky
    function unScareGhosts() {
      ghosts.forEach(ghost => ghost.isScared = false)
    }
  
    // vytvoření duchů
    class Ghost {
      constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
      }
    }
  
    // barvy duchů
    ghosts = [
      new Ghost('blinky', 348, 250),
      new Ghost('pinky', 376, 400),
      new Ghost('inky', 351, 300),
      new Ghost('clyde', 379, 500)
      ]
  
    // vykreslení duchů
    ghosts.forEach(ghost => {
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add('ghost')
      })
  
    // náhodný pohyb duchů
    ghosts.forEach(ghost => moveGhost(ghost))
  
    function moveGhost(ghost) {
      const directions =  [-1, +1, width, -width]
      let direction = directions[Math.floor(Math.random() * directions.length)]
  
      ghost.timerId = setInterval(function() {
        if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
          !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]
  
        // když se duch bojí
        if (ghost.isScared) {
          squares[ghost.currentIndex].classList.add('scared-ghost')
        }
  
        // když se duch bojí a pacman se ho dotkne
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
          squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
          ghost.currentIndex = ghost.startIndex
          score +=100
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
      checkForGameOver()
      }, ghost.speed)
    }
  
    // duch se dotkne pacmana - konec hry
    function checkForGameOver() {
      if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert("Game Over"); }, 500)
      }
    }
  
    // konec hry když skóre dosáhne maximální hodnoty
    function checkForWin() {
      if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert("You have WON!"); }, 500)
      }
    }
  })