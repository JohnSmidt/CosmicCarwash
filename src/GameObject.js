class GameObject
{
    constructor(updateDisabled = false)
    {
        this.updateDisabled = updateDisabled;
        this.children = [];
    }
    getClassName()
    {
        return this.constructor.name;
    }

    add(child) {
        this.children.push(child)
    }

    removeAll() {
        this.children= [];
    }
    render(ctx){

    }

}
