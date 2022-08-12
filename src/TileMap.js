import Pacman from "./Pacman.js"
import Enemy from "./Enemy.js"
import MovingDirection from "./MovingDirection.js"

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize

    this.yellowDot = new Image()
    this.yellowDot.src = "images/heart.png"

    this.pinkDot = new Image()
    this.pinkDot.src = "images/pinkDot.png"

    this.wall = new Image()
    this.wall.src = "images/wall.png"

    this.powerDot = this.pinkDot
    this.powerDotAnmationTimerDefault = 30
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault
  }

  //Map for game
  //0 = dot
  //1 = wall
  //4 = pacman
  //5 = empty space
  //6 = enemy
  //7 - power dot
  value = -1

  map = [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1,
    ],
    [
      1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1,
    ],
    [
      1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0,
      1,
    ],
    [
      1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      1,
    ],
    [
      1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0,
      1,
    ],
    [
      1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
      1,
    ],
    [
      1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0,
      1,
    ],
    [
      1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
      1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
      1,
    ],
    [
      1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      1,
    ],
    [
      1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      1,
    ],
    [
      1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
      1,
    ],
    [
      1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1,
    ],
  ]

  //draw map
  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column]
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize)
        } else if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileSize)
        } else if (tile == 7) {
          this.#drawPowerDot(ctx, column, row, this.tileSize)
        } else {
          this.#drawBlank(ctx, column, row, this.tileSize)
        }

        //too see how block render
        // ctx.strokeStyle = "yellow"
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // )
      }
    }
  }

  //draw Dots
  #drawDot(ctx, column, row, size) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnmationTimer--
    if (this.powerDotAnmationTimer === 0) {
      this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault
      if (this.powerDot == this.pinkDot) {
        this.powerDot = this.yellowDot
      } else {
        this.powerDot = this.pinkDot
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size)
  }

  //draw Walls
  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black"
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size)
  }

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column]
        if (tile === 4) {
          this.map[row][column] = 0
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          )
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = []
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column]
        if (tile == 6) {
          this.map[row][column] = 0
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          )
        }
      }
    }
    return enemies
  }

  //set Size of the Map
  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize
    canvas.height = this.map.length * this.tileSize
  }

  didCollideWithEnviroment(x, y, direction) {
    if (direction == null) {
      return
    }
    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0
      let row = 0
      let nextColumn = 0
      let nextRow = 0

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize
          column = nextColumn / this.tileSize
          row = y / this.tileSize
          break
        case MovingDirection.left:
          nextColumn = x - this.tileSize
          column = nextColumn / this.tileSize
          row = y / this.tileSize
          break
        case MovingDirection.up:
          nextRow = y - this.tileSize
          row = nextRow / this.tileSize
          column = x / this.tileSize
          break
        case MovingDirection.down:
          nextRow = y + this.tileSize
          row = nextRow / this.tileSize
          column = x / this.tileSize
          break
      }
      const tile = this.map[row][column]
      if (tile === 1) {
        return true
      }
    }
    return false
  }
  didWin() {
    return this.#dotsLeft() === 0
  }
  #dotsLeft() {
    return this.map.flat().filter((tile) => tile === 0).length
  }

  eatDot(x, y, pause) {
    const row = y / this.tileSize
    const column = x / this.tileSize
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 0) {
        this.map[row][column] = 5
        if (!pause) {
          setInterval(() => {
            this.map[row][column] = 0
          }, 1 + Math.floor(Math.random() * 10000))
        }

        this.value = this.value + 1
        document.getElementById("SCORE").innerHTML = this.value
        return true
      }
    }
    return false
  }
  eatPowerDot(x, y) {
    const row = y / this.tileSize
    const column = x / this.tileSize
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column]
      if (tile === 7) {
        this.map[row][column] = 0
        this.value = this.value + 2
        document.getElementById("SCORE").innerHTML = this.value
        return true
      }
    }
    return false
  }
}
