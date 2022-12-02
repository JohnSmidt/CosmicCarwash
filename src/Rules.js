class Rules {
    constructor() {
        this.rules = [
            {
                "high": {
                    "lane":"h",
                    "read":"All customers with a red, green, or blue car MUST receive the . \nNO EXCEPTIONS.",
                    "logic":"customer.vehicleColor=='Red'||customer.vehicleColor=='Green'||customer.vehicleColor=='Blue'||customer.vehicleColor=='#FF0000'||customer.vehicleColor=='#00FF00'||customer.vehicleColor=='#0000FF'"
                },
                "medium": {
                    "lane":"m",
                    "read":"Any customer vehicles over 50,000 KG in weight will go \nin the right lane.",
                    "logic":"customer.vehicleWeight>50000"
                },
                "low": {
                    "lane":"l",
                    "read":"All remaining customers will go in the middle lane"
                }
            },
            {
                "high": {
                    "lane":"h",
                    "read":"All customers part of the New Galaxy Order faction \nwill go in the middle lane. NO EXCEPTIONS.",
                    "logic":"customer.vehicleColor=='Red'||customer.vehicleColor=='#FF0000'||customer.vehicleColor=='Orange'||customer.vehicleColor=='Salmon'||customer.vehicleColor=='Magenta'||customer.vehicleColor=='Pink'||customer.vehicleColor=='Coral'"
                },
                "medium": {
                    "lane":"m",
                    "read":"Any customer that wears sunglasses \nOR \nhas a '6' on their drivers license number will go into the left lane.",
                    "logic":"customer.hasSunglasses || customer.driversLicense.includes('6') == true"
                },
                "low": {
                    "lane":"l",
                    "read":"All remaining customers will go in the right lane"
                }
            },
            {
                "high": {
                    "lane":"h",
                    "read":"All customers with a hat AND have a vowel in their VIN Go in the \nright lane. NO EXCEPTIONS.",
                    "logic":"customer.hasHat && (customer.vin.includes('A') || customer.vin.includes('E') || customer.vin.includes('I') || customer.vin.includes('O') || customer.vin.includes('U'))"
                },
                "medium": {
                    "lane":"m",
                    "read":"Any customer taller than 120 CM or over 200 KG in weight will go in the \nleft lane",
                    "logic":"customer.height > 120 || customer.weight > 200"
                },
                "low": {
                    "lane":"l",
                    "read":"All remaining customers will go in the middle lane"
                }
            }
        ]

    }

    getRuleSet(day)
    {
        return this.rules[day];
    }
}
