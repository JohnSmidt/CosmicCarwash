class DialogueBox extends GameObject{
    constructor(dialogue, w, h, x, y, expiration = 3) {
        super();
        this.time = 0;
        this.dialogue = dialogue
        this.width = w;
        this.height = h;
        this.pos = { x: x, y: y};
        this.expiration = expiration;
        this.children = [];


        this.text = new Text(
            this.dialogue,
            this.pos.x + (this.width / 2),
            this.pos.y + (this.height / 2),
            {
                font: "15pt Courier New",
                fill: "rgb(240, 167, 50)",
                align: "center",
                textBaseline: "middle"
            })

        this.add(this.text);
        container.add(this);
    }

    // Find a way to make the object know the mouse is over it, or has clicked on it
    //checkIfHit(this)

    add (child) {
        this.children.push(child);
    }

    render(ctx) {
        ctx.lineWidth = 3;
        ctx.fillStyle = "rgb(43, 43, 43)";
        ctx.strokeRect(this.pos.x, this.pos.y, this.width,  this.height)
        ctx.fillRect(this.pos.x+1, this.pos.y+1, this.width-1,  this.height-1);
        ctx.lineWidth = 1
    }

    update()
    {
        if(this.time > this.expiration)
        {
            container.remove(this);
        }
        this.time += dt;
    }
}