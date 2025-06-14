addLayer("U", {
    name: "Upgrade Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Upgrade Points", // Name of prestige currency
    baseResource: "point pieces", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("G", 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "U", description: "U: Reset for Upgrade points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: "G",
    upgrades: {
        11: {
            title: "Welcome!",
            description: "+1 Point Piece Per Second",
            cost: new Decimal(1),
        },
        12: {
            unlocked() { return hasAchievement("A", 11)},
            title: "The Second",
            description: "x2 Point Pieces",
            cost: new Decimal(2),
        },
        21: {
            unlocked() { return hasAchievement("A", 11)},
            title: "Row 2!",
            description: "Get Point Pieces Based Off Of Upgrade Points",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        22: {
            unlocked() { return hasAchievement("A", 11) && hasUpgrade("U", 21)},
            title: "New Layer!",
            description: "Unlock Next Layer",
            cost: new Decimal(5),
        },
    },
})
addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    resource: "Achievements", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    achievements: {
        11: {
            name: "2 Upgrade Points!",
            tooltip: "Get 2 Upgrade Points",
            done() { return player["U"].points.gte(2) }
        }
    }
})
addLayer("G", {
    name: "Grades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Grades", // Name of prestige currency
    baseResource: "point pieces", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "G", description: "G: Reset for Grades", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("U", 22)},
    upgrades: {
        11: {
            title: "More",
            description: "+5 Point Piece Per Second",
            cost: new Decimal(1),
        },
        12: {
            title: "Graded",
            description: "Grades Boosts Upgrades",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
})