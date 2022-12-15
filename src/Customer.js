/**************************
 * CUSTOMER
 * Should be able to be completely randomized, randomized with bias,
 * and manually made
 **************************/
class Customer extends GameObject
{
    constructor()
    {
        super();
        this.customerName = this.randomName();
        this.planetOfBirth = this.randomPlanet()
        this.vehicleColor = this.randomColor();
        this.vehicleType = this.randomVehicleType();

        this.age = this.randomNumber(20, 130);
        this.weight = this.randomNumber(75, 250);
        this.height = this.randomNumber(121, 244);
        this.vehicleWeight = this.randomNumber(1000, 100000);

        this.hasBeard = this.randomBool(65);
        this.hasSunglasses = this.randomBool(25);
        this.hasHat = this.randomBool(50);

        this.driversLicense = this.randomString(12);
        this.vin = this.randomString(10);
        this.vehicleLicensePlate = this.randomString(10);

        this.head = new Alien(this);
        this.license = new License(this)
        this.children = [this.head, this.license];
        this.pos = {x:0,y:0}
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

    getLicense()
    {
        this.license.reveal();
    }

    giveLicense()
    {
        this.license.unreveal();
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
        var cities = [
            "Clamdale",
            "Wossa",
            "Elsing",
            "New Ventura",
            "Soothmont",
            "Vyr",
            "Darbus",
            "Trula",
            "Flagos",
            "Breem",
            "Roc 5",
            "Carrion",
            "Laruto",
            "Ambur",
            "Richstein",
            "Lent",
            "Kentridge",
            "Cardin",
            "Cidoville",
            "Agrigonia",
            "Magus",
            "Tirith",
            "Mirth",
            "Plohgow",
            "Ramford"
        ]
        return this.randomFromList(cities);
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
