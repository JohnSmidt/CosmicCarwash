class UIBox extends GameObject{
    constructor(w, h, x, y) {
        super();
        this.width = w;
        this.height = h;
        this.pos = { x: x, y: y};
        //this.action = action;
        this.children = [];

        console.log("UIBox is alive");
    }

    // Find a way to make the object know the mouse is over it, or has clicked on it
    //checkIfHit(this)

    add (child) {
        this.children.push(child);
    }
}