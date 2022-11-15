class License extends GameObject {
    constructor(customer) {
        super();
        this.revealed = false
        this.img = new Image();
        this.img.src = 'images/License.png'
        this.customer = customer;
        this.children = [];
        console.log("License Is Alive")
        this.add(new Text(this.customer.planetOfBirth, 818, 480,{
            font: "18pt Arial Black",
            fill: "rgb(43, 43, 43)",
            align: "left"
        }));
        this.add(new Text(this.customer.age, 992, 516,{
            font: "600 12pt Arial",
            fill: "rgb(43, 43, 43)",
            align: "left"
        }));
        this.add(new Text(this.customer.weight + " KG", 1017, 535,{
            font: "600 12pt Arial",
            fill: "rgb(43, 43, 43)",
            align: "left"
        }));
        this.add(new Text(this.customer.height + " CM", 1025, 554,{
            font: "600 12pt Arial",
            fill: "rgb(43, 43, 43)",
            align: "left"
        }));
        this.add(new Text(this.customer.driversLicense, 1056, 613,{
            font: "600 12pt Arial",
            fill: "rgb(43, 43, 43)",
            align: "left"
        }));

        this.add(new Text(this.customer.customerName, 810, 650,{
            font: "18pt Arial Black",
            fill: "rgb(43, 43, 43)",
            align: "left"
        }));

    }

    reveal()
    {
        console.log("REVEALED")
        this.revealed = true
    }

    add(child)
    {
        this.children.push(child)
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
