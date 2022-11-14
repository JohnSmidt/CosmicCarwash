class Alien extends GameObject {
    constructor(customer) {
        super();
        this.customer = customer;
        this.img = new Image();
        this.img.src = 'images/AlienHead0.png'
        console.log("Alien Is Alive")

        var flag = 0;
        if(this.customer.hasHat) {
            flag += 1;
        }
        if(this.customer.hasSunglasses) {
            flag += 2;
        }
        if(this.customer.hasBeard) {
            flag += 4;
        }
        this.img.src = 'images/AlienHead' + flag + '.png';
    }

    render(ctx) {
        ctx.drawImage(this.img, 800, 100, 160, 220)
    }
}