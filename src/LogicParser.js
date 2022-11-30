class LogicParser {
    constructor() {
        this.rules = new Rules();
    }

    checkCustomer(customer, day, choice)
    {
        var ruleSet = this.rules.getRuleSet(day);

        // Check highest priority first
        if(eval(ruleSet.high.logic)) {
            return choice === ruleSet.high.lane;
        }

        // Then medium
        if(eval(ruleSet.medium.logic)){
            return choice === ruleSet.medium.lane;
        }

        // Then smallest
        return choice === ruleSet.low.lane;

    }

    getRules(day) {
        return {
            "high": this.rules.getRuleSet(day).high.read,
            "med": this.rules.getRuleSet(day).medium.read,
            "low": this.rules.getRuleSet(day).low.read
        }
    }
}
