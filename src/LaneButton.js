class LaneButton extends GameObject {
    constructor(w, h, x, y, label, disabled = false, style, lane) {
        super();
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

        // This will be an image
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
        this.lane = lane;
        this.chosen = false;
    }

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

        if(this.chosen)
        {
            ctx.strokeRect(this.pos.x - 5, this.pos.y - 5, this.width + 10,  this.height + 10)
        }
    }
}

