class Button extends GameObject {
    constructor(name, w, h, x, y, label, disabled = false, style) {
        super();
        this.name = name;
        var defaultStyle = {
            font: "20pt Quantico",
            fill: (disabled ? "rgb(240, 167, 50)" : "rgb(43,43,43)"),
            align: "center",
            textBaseline: "middle"
        }
        this.width = w;
        this.height = h;
        this.pos = { x: x, y: y};
        this.disabled = disabled;

        this.children = [];
        this.style = style? style : defaultStyle;

        this.text = new Text(
            label,
            this.pos.x + (this.width / 2),
            this.pos.y + (this.height / 2),
            {
                font: "20pt Quantico",
                fill: (disabled ? "rgb(240, 167, 50)" : "rgb(43,43,43)"),
                align: "center",
                textBaseline: "middle"
            })

        this.add(this.text);
        console.log("Button is alive");
    }

    // Find a way to make the object know the mouse is over it, or has clicked on it
    //checkIfHit(this)

    add (child) {
        this.children.push(child);
    }

    toggleDisable()
    {
        this.disabled ? this.disabled = false : this.disabled = true;
    }

    setLabel(newLabel) {
        this.text.text = newLabel;
    }

    render(ctx) {
        if(!this.disabled)
        {
            ctx.fillRect(this.pos.x, this.pos.y, this.width,  this.height);
            this.text.style.fill = "rgb(43,43,43)";
        }
        else
        {
            ctx.strokeRect(this.pos.x, this.pos.y, this.width,  this.height);
            this.text.style.fill = "rgb(240, 167, 50)";
        }
    }
}

