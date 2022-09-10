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
                    case "Button":
                        if(!child.disabled)
                            ctx.fillRect(child.pos.x, child.pos.y, child.width,  child.height);
                        else
                            ctx.strokeRect(child.pos.x, child.pos.y, child.width,  child.height)
                    break;
                    case "UIBox":
                        ctx.strokeRect(child.pos.x, child.pos.y, child.width,  child.height)
                        ctx.strokeRect(child.pos.x -5, child.pos.y-5, child.width + 10, child.height +10)
                    break;
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