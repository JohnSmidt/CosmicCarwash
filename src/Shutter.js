class Shutter extends GameObject {
    constructor(x, y, w, h) {
        super();
        this.isOpen = false
        this.width = w;
        this.height = h;
        this.pos = { x: x, y: y};
        this.closedPos = { x: x, y: y};
        this.img = new Image();
        this.img.src = 'images/Shutter.png'
        console.log("Shutter Is Alive" + this.pos.x)
    }

    render(ctx) {
        ctx.drawImage(this.img, this.pos.x,this.pos.y,this.width,this.height)
    }

    open(){
        
    }

    close(callback = null){
        
    }
}