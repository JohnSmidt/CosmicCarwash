class Rules {
    constructor() {
        this.rules = [
            {
                "description":"Welcome to your first day! Looks like S.U.D.S is focused on specific colors for the Cosmic Wash. \nNote that it is looking strictly for red, green or blue. Not lime, or coral or anything like that. \nAlso, if a button isnt working, its probably because you need to follow our standard procedure for \nsending a customer through (giving the customer their license back, closing the shutter, ect.) \nHopefully everything goes well. Good luck!",
                "high":"All customers with SPECIFICALLY a red, green, or blue car will receive the Cosmic Wash. NO EXCEPTIONS.",
                "medium":"Any customer vehicles over 50,000 KG in weight will receive the Plus wash.",
                "low":"All remaining customers will receive the basic wash"
            },
            {
                "description":"The New Galaxy Order has an important event happening this evening, so it makes sense that S.U.D.S. \nhas concluded they will all want the Cosmic Wash. Maintain your procedures, and today should go \nby without too much of a hitch.",
                "high":"All customers part of the New Galaxy Order faction will receive the Cosmic Wash. NO EXCEPTIONS.",
                "medium":"Any customer that wears sunglasses OR has a '6' on their drivers license number will receive \nthe Plus wash.",
                "low":"All remaining customers will receive the basic wash"
            },
            {
                "description":"Looks like S.U.D.S threw an 'AND' at us. Dont worry too much, just be sure that both requirements are \nbeing met before sending them through. Good luck today.",
                "high": "All customers with a hat AND have either an 'A', 'E', 'I', 'O' or 'U' in their VIN will receive the Cosmic Wash. NO EXCEPTIONS.",
                "medium": "Any customer taller than 200 CM will receive the Plus wash",
                "low": "All remaining customers will receive the basic wash"
            },
            {
                "description":"Oddly, the S.U.D.S. program has determined that all people named Steve will only ever want the basic \nwash from here on out. DO NOT GIVE PEOPLE NAMED STEVE ANYTHING OTHER THAN THE BASIC WASH. \nWeird, I know, but S.U.D.S. knows what it's doing",
                "high": "All customers belonging to the planet Atomica will receive the Cosmic Wash. \nNO EXCEPTIONS (besides Steve).",
                "medium": "Any customer affiliated with the Star Templars or the Dark Gravity faction will receive the Plus wash",
                "low":"All remaining customers will receive the basic wash"
            },
            {
                "description":"Remember, Steves only get the basic wash.",
                "high": "All customers with a vowel (not including 'y') in both their drivers license and license plate will receive the Cosmic \nWash. NO EXCEPTIONS. (besides Steve)",
                "medium": "Any customer with a class B vehicle will receive the Plus wash",
                "low": "All remaining customers will receive the basic wash"
            },
            {
                "description":"Sulfus just discovered a substance on their planet that is HIGHLY valuable, and S.U.D.S is certain \nthat everyone from Sulfus will ALWAYS want a Cosmic wash for the present future, BUT it is \nstill insisting that any Steve will only want a basic wash, even if they are from Sulfus. \n\nOperators, be sure to keep that in mind from here on out.",
                "high": "All Customers with a 'z' in their name will receive the Cosmic Wash \nNO EXCEPTIONS. (Remember all Sulfus customers will receive the Cosmic wash too, besides Steve)",
                "medium": "Any customer living in the outer system will receive the Plus wash",
                "low": "All remaining customers will go in the basic wash"
            },
            {
                "description":"Your 10 day review is coming up soon. Keep working hard and getting customers processed as quickly as possible, and there may be a raise in your future!",
                "high": "All customers part of the Chimera's fang faction with a '5' in their VIN will receive the Cosmic Wash, along with Sulfus customers. NO EXCEPTIONS. (Besides Steve)",
                "medium": "Any customer living on a planet with a Habitable Planet Classification less than 5 will receive the Plus wash",
                "low": "All remaining customers will go in the middle lane"
            },
            {
                "description":"S.U.D.S has now determined that any class D vehicle will want the Plus was from here on out. This may be confusing, so remember that Steve always gets the basic wash. If its not Steve, THEN if they are from Sulfus, they will get the Cosmic wash. If they are not from Sulfus, THEN if they have a class D vehicle, they will get the Plus wash. Only after that, should you follow the daily priorities.",
                "high": "All customers with sunglasses, and a hat will receive \n the Cosmic Wash. Also, anyone that is not part of any faction will also receive the Cosmic wash. NO EXCEPTIONS. (besides the other circumstances).",
                "medium": "Any customer from Atomica will receive the Plus wash. Also, anyone who is not a donor will receive the Plus wash. ",
                "low": "All remaining customers will receive the basic wash."
            },
            {
                "description":"Bad News. The facility where S.U.D.S. operates had a major power outage. It is attempting a reboot, but its dictation processes are on the fritz. Try to discern what it is trying to say, and make your best choice.",
                "high": "All csutmores IHTWTOU a hat AND [*&^DzzzzzTT] Petram **0xA7F2301B** \n  the Cosmic Wash. NO EXCEPTIONS. (besides SSSSSS-",
                "medium": "Any peepes not unsubscribed nEW mOnArch{insert_grammar_here} ***? PLUsSPLuSPlUSpLUS",
                "low": "EvreOnE eLSE, baBe1"
            },
            {
                "description":"Last day before your review. Amazing work so far. Just get through today, and we'll be able to discuss a possible promotion within the company.",
                "high": "All customers with a name that starts with a letter between C and H will receive \n the Cosmic Wash. NO EXCEPTIONS (besides the other circumstances).",
                "medium": "Any customer with a city name that starts with a letter between G and U will receive the Plus wash",
                "low": "All remaining customers will receive the basic wash."
            }
        ]
    }

    getRuleSet(day)
    {
        return this.rules[day];
    }
}
