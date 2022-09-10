class Button extends GameObject {
    constructor(w, h, x, y, label, disabled = false) {
        super();
        this.width = w;
        this.height = h;
        this.pos = { x: x, y: y};
        this.disabled = disabled;
        //this.action = action;
        this.children = [];

        this.add(new Text(
            label,
            this.pos.x + (this.width / 2),
            this.pos.y + (this.height / 2),
            {
                font: "20pt Quantico",
                fill: (disabled ? "rgb(240, 167, 50)" : "rgb(43,43,43)"),
                align: "center",
                textBaseline: "middle"
            }))
        console.log("Button is alive");
    }

    // Find a way to make the object know the mouse is over it, or has clicked on it
    //checkIfHit(this)

    add (child) {
        this.children.push(child);
    }
}

