import collisions from "./util/collisiondata"
import { boundary } from "./util/classes"
import rectangularCollision from "./util/collision"
console.log("game.js is loaded")

//declare canvas
let canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

//declare values
let offset = {
  x: -736,
  y: -642
}
const map = document.querySelector(".img1")
let boundaryMap = []
let collisionBlocks = []
let playersprites = {
  up: document.querySelector(".img2"),
  down: document.querySelector(".img5"),
  left: document.querySelector(".img4"),
  right: document.querySelector(".img3"),
}
const playerImage = document.querySelector(".img5")
let playerspeed = canvas.height / 96;
const keys = { w: { pressed: false }, a: { pressed: false }, s: { pressed: false }, d: { pressed: false }, }
//declare constructors
class sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.image.src = image.src

    this.animate = animate
    this.sprites = sprites
    this.opacity = 1

    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )

    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}
//decrypting
for (let i = 0; i < collisions.length; i += 70) {
  boundaryMap.push(collisions.slice(i, 70 + i));
}
//objects
boundaryMap.forEach((row, i) => {
  row.forEach((Symbol, j) => {
    if (Symbol === 1025)
      collisionBlocks.push(new boundary({
        position: {
          x: j * 48 + offset.x,
          y: i * 48 + offset.y
        }
      }))
  })
})

console.log(collisionBlocks);
let background = new sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: map
})

let player = new sprite({
  image: playerImage,
  frames: {
    max: 4
  },
  position: {
    x: canvas.width / 2 - playerImage.width / 4 / 2,
    y: canvas.height / 2 - playerImage.height / 2
  },
})
//load after previous
let movables = [background]
movables = movables.concat(collisionBlocks)
//animation
function animate() {
  window.requestAnimationFrame(animate);
  background.draw()
  player.draw()

  collisionBlocks.forEach((boundary) => {
    boundary.draw()
  })

  if (keys.w.pressed) {
    movables.forEach(movable => {
      movable.position.y = movable.position.y += playerspeed
    })
  } else if (keys.a.pressed) {
    movables.forEach(movable => {
      movable.position.x = movable.position.x += playerspeed
    })
  } else if (keys.s.pressed) {
    movables.forEach(movable => {
      movable.position.y = movable.position.y += -playerspeed
    })
  } else if (keys.d.pressed) {
    movables.forEach(movable => {
      movable.position.x = movable.position.x += -playerspeed
    })
  }
}
animate()
//event liteners
document.body.addEventListener("touchend", () => {
  console.log('mouse is up')
  keys.w.pressed = false
  keys.a.pressed = false
  keys.s.pressed = false
  keys.d.pressed = false
})
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      keys.w.pressed = true
      break
    case "a":
    case "ArrowLeft":
      keys.a.pressed = true
      break
    case "s":
    case "ArrowDown":
      keys.s.pressed = true
      break
    case "d":
    case "ArrowRight":
      keys.d.pressed = true
      break
  }
})
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      keys.w.pressed = false
      break
    case "a":
    case "ArrowLeft":
      keys.a.pressed = false
      break
    case "s":
    case "ArrowDown":
      keys.s.pressed = false
      break
    case "d":
    case "ArrowRight":
      keys.d.pressed = false
      break
  }
})

//touch
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => {
  keys.a.pressed = true
});

document.querySelector(".dpad-up").addEventListener("touchstart", (e) => {
  keys.w.pressed = true
});

document.querySelector(".dpad-right").addEventListener("touchstart", (e) => {
  keys.d.pressed = true
});

document.querySelector(".dpad-down").addEventListener("touchstart", (e) => {
  keys.s.pressed = true
});