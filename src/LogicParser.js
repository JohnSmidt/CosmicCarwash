class LogicParser {
    constructor() {
        this.rules = new Rules();
    }

    checkCustomer(customer, day, choice)
    {
        let response = {};
        switch(day) {
            case 0:
                response = this.levelOne(customer, choice)
            break;
            case 1:
                response = this.levelTwo(customer, choice)
            break;
            case 2:
                response = this.levelThree(customer, choice)
            break;
            case 3:
                response = this.levelFour(customer, choice)
            break;
            case 4:
                response = this.levelFive(customer, choice)
            break;
            case 5:
                response = this.levelSix(customer, choice)
            break;
            case 6:
                response = this.levelSeven(customer, choice)
            break;
            case 7:
                response = this.levelEight(customer, choice)
            break;
            case 8:
                response = this.levelNine(customer, choice)
            break;
            case 9:
                response = this.levelTen(customer, choice)
            break;
            default:
                response = {"message":"Not sure what happened here", "passed":false}
            break;
        }

        return response;
    }

    getRules(day) {
        return {
            "description": this.rules.getRuleSet(day).description,
            "high": this.rules.getRuleSet(day).high,
            "med": this.rules.getRuleSet(day).medium,
            "low": this.rules.getRuleSet(day).low
        }
    }

    // Now, for the levels...
    // This way is a bit repetitive, I know, but all the other ways I tried required some really odd ways of storing the
    // level's rules that I was not comfortable with.
    levelOne(customer, choice) {

        // High Lane
        if(customer.vehicleColor === 'Red' || customer.vehicleColor === '#FF0000') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Red", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Green' || customer.vehicleColor === '#00FF00') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Green", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Blue' || customer.vehicleColor === '#0000FF') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Blue", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Mid Lane
        if(customer.vehicleWeight > 50000) {
            if(choice === 'm') {
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was over 50,000KG", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }
    }

    levelTwo(customer, choice) {
        // High Lane
        if(customer.vehicleColor === 'Red' || customer.vehicleColor === '#FF0000') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Red, part of New Galaxy Order", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Magenta' || customer.vehicleColor === '#FF00FF') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Magenta, part of New Galaxy Order", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Orange') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Orange, part of New Galaxy Order", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Salmon') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Salmon, part of New Galaxy Order", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Pink') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Pink, part of New Galaxy Order", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Coral') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Coral, part of New Galaxy Order", "passed":false}
            }
        }


        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Mid Lane
        if(customer.hasSunglasses) {
            if(choice === 'm') {
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had sunglasses", "passed":false}
            }
        }
        if(customer.driversLicense.includes('6')) {
            if(choice === 'm') {
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a '6' in drivers license number", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }
    }

    levelThree(customer, choice) {
        // High Lane

        if(customer.hasHat && (customer.vin.includes('A') || customer.vin.includes('E') || customer.vin.includes('I') || customer.vin.includes('O') || customer.vin.includes('U'))) {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle had a hat and a vowel in their VIN", "passed":false}
            }
        }

        if(customer.hasHat && !(customer.vin.includes('A') || customer.vin.includes('E') || customer.vin.includes('I') || customer.vin.includes('O') || customer.vin.includes('U'))) {
            if(choice === 'h'){
                return{"message":"Vehicle had a hat but no vowel in their VIN", "passed":false}
            }
        }

        if(!customer.hasHat && (customer.vin.includes('A') || customer.vin.includes('E') || customer.vin.includes('I') || customer.vin.includes('O') || customer.vin.includes('U'))) {
            if(choice === 'h'){
                return{"message":"Vehicle had a vowel in their VIN, but no hat", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Mid Lane
        if(customer.height > 200) {
            if(choice === 'm') {
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was over 200CM", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }
    }

    levelFour(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }

        if(customer.planetOfBirth === 'Vyr') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Vyr, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Darbus') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Darbus, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Trula') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Trula, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Flagos') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Flagos, Atomica", "passed":false}
            }
        }
        if(customer.planetOfBirth === 'Breem') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Breem, Atomica", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle
        if(customer.vehicleColor === 'Blue' || customer.vehicleColor === '#0000FF') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Blue, part of Star Templar's faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Purple') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Purple, part of Star Templar's faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Aqua' || customer.vehicleColor === '#00FFFF') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Aqua, part of Star Templar's faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Indigo') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Indigo, part of Star Templar's faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Mauve') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Mauve, part of Star Templar's faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Cerulean') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Cerulean, part of Star Templar's faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Black' || customer.vehicleColor === '#000000') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Black, part of the Dark Gravity faction", "passed":false}
            }
        }
        if(customer.vehicleColor === 'White' || customer.vehicleColor === '#FFFFFF') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was White, part of the Dark Gravity faction", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Grey' || customer.vehicleColor === '#C0C0C0' || customer.vehicleColor === '#808080' || customer.vehicleColor === '#404040') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was a shade of Grey, part of the Dark Gravity faction", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Brown') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Brown, part of the Dark Gravity faction", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Tan') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Tan, part of the Dark Gravity faction", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Beige') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Beige, part of the Dark Gravity faction", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }

    }

    levelFive(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }

        // High Lane
        if((customer.driversLicense.includes('A') || customer.driversLicense.includes('E') || customer.driversLicense.includes('I') || customer.driversLicense.includes('O') || customer.driversLicense.includes('U')) && (customer.vehicleLicensePlate.includes('A') || customer.vehicleLicensePlate.includes('E') || customer.vehicleLicensePlate.includes('I') || customer.vehicleLicensePlate.includes('O') || customer.vehicleLicensePlate.includes('U'))) {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had vowels in drivers license and license plate", "passed":false}
            }
        }

        if(!(customer.driversLicense.includes('A') || customer.driversLicense.includes('E') || customer.driversLicense.includes('I') || customer.driversLicense.includes('O') || customer.driversLicense.includes('U')) && (customer.vehicleLicensePlate.includes('A') || customer.vehicleLicensePlate.includes('E') || customer.vehicleLicensePlate.includes('I') || customer.vehicleLicensePlate.includes('O') || customer.vehicleLicensePlate.includes('U'))) {
            if(choice === 'h'){
                return{"message":"Customer did not have a vowel in their drivers license", "passed":false}
            }
        }

        if((customer.driversLicense.includes('A') || customer.driversLicense.includes('E') || customer.driversLicense.includes('I') || customer.driversLicense.includes('O') || customer.driversLicense.includes('U')) && !(customer.vehicleLicensePlate.includes('A') || customer.vehicleLicensePlate.includes('E') || customer.vehicleLicensePlate.includes('I') || customer.vehicleLicensePlate.includes('O') || customer.vehicleLicensePlate.includes('U'))) {
            if(choice === 'h'){
                return{"message":"Customer did not have a vowel in their license plate", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle Lane
        if(customer.vehicleType === 'Arwing' && customer.vehicleWeight > 60000) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Arwing", "passed":false}
            }
        }

        if(customer.vehicleType === 'Autumn' && customer.vehicleWeight < 30001) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Autumn", "passed":false}
            }
        }
        if(customer.vehicleType === 'AV22' && customer.vehicleWeight > 60000) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B AV22", "passed":false}
            }
        }
        if(customer.vehicleType === 'Halcyon' && customer.vehicleWeight < 30001) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Halcyon", "passed":false}
            }
        }
        if(customer.vehicleType === 'Javelin' && (customer.vehicleWeight > 30000 && customer.vehicleWeight < 60001)) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Javelin", "passed":false}
            }
        }
        if(customer.vehicleType === 'Marathon' && customer.vehicleWeight < 30001) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Marathon", "passed":false}
            }
        }
        if(customer.vehicleType === 'Minerva' && customer.vehicleWeight > 60000) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Minerva", "passed":false}
            }
        }
        if(customer.vehicleType === 'Nyx' && customer.vehicleWeight < 60001) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B Nyx", "passed":false}
            }
        }
        if(customer.vehicleType === 'TIE' && (customer.vehicleWeight > 30000 && customer.vehicleWeight < 60001)) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B TIE", "passed":false}
            }
        }
        if(customer.vehicleType === 'X-Wing' && customer.vehicleWeight > 60000) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B X-Wing", "passed":false}
            }
        }
        if(customer.vehicleType === 'YT-1300' && customer.vehicleWeight < 60001) {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a class B YT-1300", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }

    }

    levelSix(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }

        // Sulfus
        if((customer.planetOfBirth === "Magus" || customer.planetOfBirth === "Tirith" || customer.planetOfBirth === "Mirth" || customer.planetOfBirth === "Plohgow" || customer.planetOfBirth === "Ramford") && choice !== 'h') {
            return{"message":"Customer was from " + customer.planetOfBirth + ", a city on the planet Sulfus", "passed":false}
        }

        // High Lane
        if(customer.name.includes('Z') || customer.name.includes('z')) {
            if(choice === 'h') {
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had a 'Z' in their name", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle Lane
        if(customer.planetOfBirth === 'Clamdale') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Clamdale, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Wossa') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Wossa, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Elsing') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Elsing, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'New Ventura') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from New Ventura, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Soothmont') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Soothmont, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Lent') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Lent, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Kentridge') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Kentridge, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Cardin') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Cardin, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Cidoville') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Cidoville, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Agrigonia') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Agrigonia, Dulit 7", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }

    }

    levelSeven(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }

        // Sulfus
        if((customer.planetOfBirth === "Magus" || customer.planetOfBirth === "Tirith" || customer.planetOfBirth === "Mirth" || customer.planetOfBirth === "Plohgow" || customer.planetOfBirth === "Ramford") && choice !== 'h') {
            return{"message":"Customer was from " + customer.planetOfBirth + ", a city on the planet Sulfus", "passed":false}
        }

        // High Lane
        if(customer.vehicleColor === 'Green') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Green, part of the Chimera's fang faction", "passed":false}
            }
        }


        if(customer.vehicleColor === 'Chartreuse') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Chartreuse, part of the Chimera's fang faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Lime') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Lime, part of the Chimera's fang faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Yellow') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Yellow, part of the Chimera's fang faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Vermillion') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Vermillion, part of the Chimera's fang faction", "passed":false}
            }
        }

        if(customer.vehicleColor === 'Celadon') {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Vehicle was Celadon, part of the Chimera's fang faction", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle Lane
        if(customer.planetOfBirth === 'Clamdale') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Clamdale, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Wossa') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Wossa, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Elsing') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Elsing, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'New Ventura') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from New Ventura, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Soothmont') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Soothmont, Aquas", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Lent') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Lent, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Kentridge') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Kentridge, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Cardin') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Cardin, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Cidoville') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Cidoville, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Agrigonia') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Agrigonia, Dulit 7", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Roc 5') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Roc 5, Clara Petram", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Carrion') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Carrion, Clara Petram", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Laruto') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Laruto, Clara Petram", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Ambur') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Ambur, Clara Petram", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Richstein') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Richstein, Clara Petram", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }

    }

    levelEight(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }
        // Sulfus
        if((customer.planetOfBirth === "Magus" || customer.planetOfBirth === "Tirith" || customer.planetOfBirth === "Mirth" || customer.planetOfBirth === "Plohgow" || customer.planetOfBirth === "Ramford") && choice !== 'h') {
            return{"message":"Customer was from " + customer.planetOfBirth + ", a city on the planet Sulfus", "passed":false}
        }
        // Class D
        if((customer.vehicleType === "Halcyon" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Heimdall" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Ishimura" && customer.vehicleWeight > 30000) || (customer.vehicleType === "Nyx" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Sullaco" && customer.vehicleWeight > 30000)){
            if(choice !== "m") {
                return{"message":"Customer had a class D " + customer.vehicleType + ".", passed: false}
            }
        }

        // High Lane
        if(customer.hasSunglasses && customer.hasHat) {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer had hat and sunglasses", "passed":false}
            }
        }

        if(!customer.hasSunglasses && customer.hasHat) {
            if(choice === 'h'){
                return{"message":"Customer had hat, but no sunglasses", "passed":false}
            }
        }

        if(customer.hasSunglasses && !customer.hasHat) {
            if(choice === 'h'){
                return{"message":"Customer had sunglasses, but no hat", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle Lane
        if(customer.planetOfBirth === 'Vyr') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Vyr, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Darbus') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Darbus, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Trula') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Trula, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Flagos') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Flagos, Atomica", "passed":false}
            }
        }

        if(customer.planetOfBirth === 'Breem') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from Breem, Atomica", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }
    }



    levelNine(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }
        // Sulfus
        if((customer.planetOfBirth === "Magus" || customer.planetOfBirth === "Tirith" || customer.planetOfBirth === "Mirth" || customer.planetOfBirth === "Plohgow" || customer.planetOfBirth === "Ramford") && choice !== 'h') {
            return{"message":"Customer was from " + customer.planetOfBirth + ", a city on the planet Sulfus", "passed":false}
        }
        // Class D
        if((customer.vehicleType === "Halcyon" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Heimdall" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Ishimura" && customer.vehicleWeight > 30000) || (customer.vehicleType === "Nyx" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Sullaco" && customer.vehicleWeight > 30000)){
            if(choice !== "m") {
                return{"message":"Customer had a class D " + customer.vehicleType + ".", passed: false}
            }
        }

        // High Lane
        if(!customer.hasHat) {
            if(customer.planetOfBirth === "Roc 5" || customer.planetOfBirth === "Carrion" || customer.planetOfBirth === "Laruto" || customer.planetOfBirth === "Ambur" || customer.planetOfBirth === "Richstein") {
                if(choice === 'h'){
                    return{"message":"YaAaY", "passed":true}
                }
                else {
                    return{"message":"!customer.hassssHat && customer.fromClARaPetRam", "passed":false}
                }
            }
        }
        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle Lane
        if(customer.vehicleColor === 'Red' || customer.vehicleColor === '#FF0000') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Magenta' || customer.vehicleColor === '#FF00FF') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Orange') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Salmon') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Pink') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
            }
        }
        if(customer.vehicleColor === 'Coral') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
            }
        }
        if(choice === 'm') {
            return{"message":"Redro Yxalag Wen Saw Remotsuc", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }
    }

    levelTen(customer, choice) {
        // Steve
        if(customer.name === "Steve" && choice !== 'l') {
            return{"message":"Customer's name was Steve", "passed":false}
        }
        // Sulfus
        if((customer.planetOfBirth === "Magus" || customer.planetOfBirth === "Tirith" || customer.planetOfBirth === "Mirth" || customer.planetOfBirth === "Plohgow" || customer.planetOfBirth === "Ramford") && choice !== 'h') {
            return{"message":"Customer was from " + customer.planetOfBirth + ", a city on the planet Sulfus", "passed":false}
        }
        // Class D
        if((customer.vehicleType === "Halcyon" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Heimdall" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Ishimura" && customer.vehicleWeight > 30000) || (customer.vehicleType === "Nyx" && customer.vehicleWeight > 60000) || (customer.vehicleType === "Sullaco" && customer.vehicleWeight > 30000)){
            if(choice !== "m") {
                return{"message":"Customer had a class D " + customer.vehicleType + ".", passed: false}
            }
        }

        // High Lane
        if(customer.name[0] === "C" || customer.name[0] === "D" || customer.name[0] === "E" || customer.name[0] === "F" || customer.name[0] === "G" || customer.name[0] === "H") {
            if(choice === 'h'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer's name was '" + customer.name + "'.", "passed":false}
            }
        }

        if(choice === 'h') {
            return{"message":"Customer did not meet \nrequirements for Cosmic Wash", "passed":false}
        }

        // Middle Lane
        if(customer.planetOfBirth[0] === 'G' || customer.planetOfBirth[0] === 'H' || customer.planetOfBirth[0] === 'I' || customer.planetOfBirth[0] === 'J' || customer.planetOfBirth[0] === 'K' || customer.planetOfBirth[0] === 'L' || customer.planetOfBirth[0] === 'M' || customer.planetOfBirth[0] === 'N' || customer.planetOfBirth[0] === 'O' || customer.planetOfBirth[0] === 'P' || customer.planetOfBirth[0] === 'Q' || customer.planetOfBirth[0] === 'R' || customer.planetOfBirth[0] === 'S' || customer.planetOfBirth[0] === 'T' || customer.planetOfBirth[0] === 'U') {
            if(choice === 'm'){
                return{"message":"Choice successful", "passed":true}
            }
            else {
                return{"message":"Customer was from " + customer.planetOfBirth + ".", "passed":false}
            }
        }

        if(choice === 'm') {
            return{"message":"Customer did not meet \nrequirements for Plus Wash", "passed":false}
        }

        // Low Lane
        if(choice === 'l') {
            return{"message":"Choice successful", "passed":true}
        }
        else {
            return{"message":"No idea how you got here", "passed":false}
        }
    }
}
