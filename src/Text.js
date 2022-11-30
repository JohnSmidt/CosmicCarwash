class Text extends GameObject {
    constructor(text = "", x, y, style = {}, lineHeight = 20) {
        super();
        this.pos = { x: x, y: y };
        this.text = text
        this.style = style;
        this.lineHeight = lineHeight
    }

    render(ctx) {
        let textLines = this.text.toString().split("\n");
        const { font, fill, align, lineWidth, textBaseline } = this.style;
        if (font) ctx.font = font;
        if (fill) ctx.fillStyle = fill;
        if (lineWidth) ctx.lineWidth = lineWidth;
        if (align) ctx.textAlign = align;
        if (textBaseline) ctx.textBaseline = textBaseline;

        if (fill) {
            for(let i = 0; i < textLines.length; i++)
            {
                ctx.fillText(textLines[i], 0, i * this.lineHeight);
            }
        }
    }
}
