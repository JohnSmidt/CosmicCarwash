class Text extends GameObject {
    constructor(text = "", x, y, style = {}) {
        super();
        this.pos = { x: x, y: y };
        this.text = text;
        this.style = style;
        //console.log('Text Object Created!');

    }
}
