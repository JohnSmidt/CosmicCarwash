class CanvasRenderer {
    constructor (w, h) {
        const canvas = document.getElementById("game");
        this.w = canvas.width = w;
        this.h = canvas.height = h;
        this.view = canvas;
        this.ctx = canvas.getContext("2d");
        console.log("Renderer Created!")
    }

    render(container) {
        const { ctx } = this;
        function renderRec (container) {
            // Render the container children
            container.children.forEach(child => {
                ctx.save();
                // Draw the leaf node
                console.log(child);
                if (child.pos) {
                    ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
                }
                if (child.text) {
                    const { font, fill, stroke, align, lineWidth } = child.style;
                    if (font) ctx.font = font;
                    if (fill) ctx.fillStyle = fill;
                    if (stroke) ctx.strokeStyle = stroke;
                    if (lineWidth) ctx.lineWidth = lineWidth;
                    if (align) ctx.textAlign = align;
                    if (fill) ctx.fillText(child.text, 0, 0);
                    if (stroke) ctx.strokeText(child.text, 0, 0);
                }
                if (child.button) {

                }
                // Handle the child types
                if (child.children) {
                    renderRec(child);
                }
                ctx.restore();
            });

        }
        ctx.clearRect(0, 0, this.w, this.h);
        renderRec(container);
    }

}