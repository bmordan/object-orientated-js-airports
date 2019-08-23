class Airport {
    constructor(name) {
        this.name = name
        this.planes = []
    }

    land(plane) {
        this.planes.push(plane)
    }
}

module.exports = Airport