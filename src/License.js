class License extends GameObject {
    constructor(customer) {
        super();
        this.revealed = false
        this.img = new Image();
        this.img.src = 'images/License.png'
        this.customer = customer;
        console.log("License Is Alive")
    }

    reveal()
    {
        console.log("REVEALED")
        this.revealed = true
    }

    unreveal()
    {
        this.revealed = false
    }

    render(ctx) {
        if(this.revealed)
        {
            ctx.drawImage(this.img, 795, 445, 460, 220)
        }
    }
}