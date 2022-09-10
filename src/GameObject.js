class GameObject
{
    constructor(updateDisabled = false)
    {
        this.updateDisabled = updateDisabled;
        this.mouseOver = false;
        this.mainColor = "rgb()"
    }
    getClassName()
    {
        return this.constructor.name;
    }

    // Should return a bool
    checkIfMouseOver(mousePos)
    {

    }
}