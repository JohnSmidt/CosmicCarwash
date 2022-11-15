class Container {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.children = [];
        console.log("Container Created!")
    }

    get() {return this.children}

    // Container methods
    add (child) {
        this.children.push(child);
        return child;
    }

    remove (child) {
        this.children = this.children.filter(c => c !== child);
        return child;
    }

    removeAll() {
        this.children = [];
    }

    disableAll() {
        this.children.forEach(child => {
           if(child.getClassName() === "Button")
           {
               child.disabled = true;
           }
        });
    }

    update (dt, t) {
        this.children.forEach(child => {
            if (child.update) {
                child.update(dt, t);
            }
        });
    }
}
