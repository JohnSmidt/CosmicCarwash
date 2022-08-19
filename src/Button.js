class Button {
    constructor(w, h, x, y, label) {
        this.w = w;
        this.h = h;
        this.pos = { x: 0, y: 0};
        //this.action = action;
        this.children = [];
        this.children.push(new Text(label, this.pos.x, this.pos.y, {
            font: "20pt Quantico",
            fill: "black",
            align: "center"
        }))
        console.log("Button is alive");
    }

    add (child) {
        this.children.push(child);
    }
}

