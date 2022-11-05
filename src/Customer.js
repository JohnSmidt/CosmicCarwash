/**************************
 * CUSTOMER
 * Should be able to be completely randomized, randomized with bias,
 * and manually made
 **************************/
class Customer extends GameObject
{
    // List
    customerName; //
    planetOfBirth; //
    vehicleColor;
    vehicleType;

    // Number
    age;          //
    weight;       //
    customerHeight; //
    vehicleWeight;

    // String
    driversLicense;  //
    vin;
    vehicleLicensePlate;

    // Bool
    hasBeard;
    hasSunglasses;
    hasHat;

    constructor()
    {
        super();
        this.customerName = this.randomName();
        this.planetOfBirth = this.randomPlanet()
        this.vehicleColor = this.randomColor();
        this.vehicleType = this.randomVehicleType();

        this.age = this.randomNumber(20, 130);
        this.weight = this.randomNumber(75, 250);
        this.customerHeight = this.randomNumber(121, 244);
        this.vehicleWeight = this.randomNumber(1000, 100000);

        this.hasBeard = this.randomBool(65);
        this.hasSunglasses = this.randomBool(25);
        this.hasHat = this.randomBool(50);

        this.driversLicense = this.randomString(12);
        this.vin = this.randomString(10);
        this.vehicleLicensePlate = this.randomString(10);

        this.head = new Alien(this);
        this.children = [this.head];
        this.pos = {x:0,y:0}
        console.log(this)
    }

    randomNumber(min, max)
    {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    randomBool(trueRatio)
    {
        var randomNum = Math.floor(Math.random() * (100 - 1) ) + 1
        return randomNum < trueRatio;
    }

    randomName()
    {
        var names = [
            "Steve", "Dave", "Allan",
            "Vinny", "Zed", "Zim",
            "Xander", "Frank", "Gorbulon",
            "Snelthor", "Meebz", "Ria",
            "Pental", "Flakk", "Dinn",
            "Elvis", "Korome", "Kimya",
            "Rokkuta", "Melthan", "Threek",
            "Kamtram", "Guvy", "Snarth",
            "Thader", "Ringo", "Drax",
            "Bo", "Agador", "J'Duun",
            "Koob",
            "Zax", "Kreebo", "Fenix"
        ]
        return this.randomFromList(names);
    }

    randomPlanet()
    {
        var planets = ["Placeholder", "Placeholder"]
        return this.randomFromList(planets);
    }

    randomColor()
    {
        var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Beige", "Grey", "White", "Black", "Lime", "Salmon", "Coral", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF", "#C0C0C0", "#404040", "Chartreuse", "Mauve", "Vermilion", "Brown", "Celadon", "Cerulean"]
        return this.randomFromList(colors);
    }

    randomVehicleType()
    {
        var vehicleTypes = ["YT-1300", "TIE", "X-Wing", "Halcyon", "Autumn", "AV22", "Nyx", "Minerva", "Heimdall", "Arwing", "Ishimura", "Sullaco", "Banshee", "Javelin", "Marathon" ];
        return this.randomFromList(vehicleTypes);
    }

    randomFromList(list)
    {
        return list[this.randomNumber(0, list.length)];
    }

    randomString(length)
    {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    showHead()
    {
        this.children = [this.head]
    }

    removeHead()
    {
        this.children = []
    }

    render(ctx) {

    }
}