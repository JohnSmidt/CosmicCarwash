class Text {
    constructor(text = "", x, y, style = {}) {
        this.pos = { x: x, y: y };
        this.text = text;
        this.style = style;
        console.log('Text Object Created!');
    }

    update()
    {
        //console.log("Im being updated!")
        this.pos.x += 70 * dt;
    }
}
