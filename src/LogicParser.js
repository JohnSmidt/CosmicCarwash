class LogicParser {
    constructor(rules) {
        this.rules = rules;
    }

    checkCustomer(customer, day, choice)
    {
        var ruleSet = this.rules[day];

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
}