class Square extends GameObject {
    constructor(width, height, x, y, r, g, b, outline = false) {
        super();
        this.width = width;
        this.height = height;
        this.pos = {x:x, y:y};
        this.fill = {r:r, g:g, b:b}
        this.children = [];
        this.outline = outline
    }

    add(child) {
        this.children.push(child);
    }

    render(ctx) {
        if(this.outline) {
            ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height)
        }
        else {
            ctx.fillStyle = "rgb("+this.fill.r+", "+this.fill.g+", "+this.fill.b+")"
            ctx.fillRect(this.pos.x, this.pos.y, this.width,  this.height);
            ctx.fillStyle = "rgb(240, 167, 50)";
        }

    }
}