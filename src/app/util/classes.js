
let canvas = document.querySelector("canvas")
canvas.width = 1024
canvas.height = 576
const c = canvas.getContext("2d")

  class boundary {
    constructor({position,}){
        this.position = position 
        this.w = 48
        this.h = 48
    }
    draw() {
        c.fillStyle = "rgba(219, 0, 0, 0.3)"
        c.fillRect(this.position.x,this.position.y,this.h,this.w)
    }
}
  export {boundary}