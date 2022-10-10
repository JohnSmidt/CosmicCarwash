class UIBox extends GameObject{
    constructor(name, w, h, x, y) {
        super();
        this.name = name;
        this.width = w;
        this.height = h;
        this.pos = { x: x, y: y};
        //this.action = action;
        this.children = [];

        console.log("UIBox is alive");
    }

    // Find a way to make the object know the mouse is over it, or has clicked on it
    //checkIfHit(this)

    add (child) {
        this.children.push(child);
    }

    render(ctx) {
        ctx.fillStyle = "rgb(43, 43, 43)";
        ctx.strokeRect(this.pos.x + 5, this.pos.y + 5, this.width + 5, this.height + 5)
        ctx.fillRect(this.pos.x + 5, this.pos.y + 5, this.width + 5,  this.height + 5);
        ctx.strokeRect(this.pos.x, this.pos.y, this.width,  this.height)

        ctx.fillRect(this.pos.x, this.pos.y, this.width,  this.height);
        ctx.fillStyle = "rgb(240, 167, 50)";
    }
}