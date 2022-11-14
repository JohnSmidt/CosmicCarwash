class CanvasRenderer {
    constructor (w, h) {
        const canvas = document.getElementById("game");
        this.w = canvas.width = w;
        this.h = canvas.height = h;
        this.view = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "rgb(240, 167, 50)";
        this.ctx.strokeStyle = "rgb(240, 167, 50)"
        console.log("Renderer Created!")
    }

    render(container) {
        const { ctx } = this;
        function renderRec (container) {
            // Render the container children
            container.children.forEach(child => {
                if(child.renderEnabled)
                {
                    ctx.save();
                    // Draw the leaf node
                    if (child.pos) {
                        ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
                    }

                    // Build based on which object it is
                    switch(child.getClassName())
                    {
                        case "Text":
                            const { font, fill, align, lineWidth, textBaseline } = child.style;
                            if (font) ctx.font = font;
                            if (fill) ctx.fillStyle = fill;
                            if (lineWidth) ctx.lineWidth = lineWidth;
                            if (align) ctx.textAlign = align;
                            if (textBaseline) ctx.textBaseline = textBaseline;
                            if (fill) ctx.fillText(child.text, 0, 0);
                        break;
                        default:
                            child.render(ctx);
                        break;
                    }

                    // Handle the child types
                    if (child.children) {
                        renderRec(child);
                    }
                    ctx.restore();
                }
            });

        }
        ctx.clearRect(0, 0, this.w, this.h);
        renderRec(container);
    }

}