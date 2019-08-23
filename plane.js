class Plane {
    board(passengers) {
        this.passengers = passengers
    }

    outbound(airport) {
        airport ? this.outbound = airport : this.outbound
    }

    inbound(airport) {
        airport ? this.inbound = airport : this.inbound
    }

    takeOff() {
        const slot = this.outbound.planes.indexOf(this)
        this.outbound.planes.splice(slot,1)
        this.inbound.land(this)
    }
}

module.exports = Plane