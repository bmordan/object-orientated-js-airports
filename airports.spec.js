const Passenger = require("./passenger")
const Bag = require("./bag")
const Plane = require("./plane")
const Airport = require("./airport")

describe("Passenger", () => {
    it("have a name", () => {
        const passenger = new Passenger("Busola")
        expect(passenger.name).toEqual("Busola")
    })

    it("have bags", () => {
        const passenger = new Passenger("Buster")
        const bag = new Bag(24)
        passenger.addBag(bag)
        expect(passenger.bags.length).toBe(1)
        expect(passenger.bags[0]).toBe(bag)
    })
})

describe("Bag", () => {
    it("have a weight", () => {
        const bag = new Bag(12)
        expect(bag.weight).toEqual("12kg")
    })
})

describe("Plane", () => {
    it("can be borded by passengers", () => {
        const plane = new Plane
        const passengers = [new Passenger("Boo Yen"), new Passenger("Chan Lee")]
        plane.board(passengers)
        expect(plane.passengers[0].name).toEqual("Boo Yen")
    })

    it("has an outbound airport and an inbound airport", () => {
        const LHR = new Airport("LHR")
        const JFK = new Airport("JFK")
        const plane = new Plane
        LHR.land(plane)
        plane.outbound(LHR)
        plane.inbound(JFK)
        expect(LHR.planes.length).toBe(1)
        expect(JFK.planes.length).toBe(0)
        expect(plane.outbound.name).toEqual("LHR")
        expect(plane.inbound.name).toEqual("JFK")
    })

    it("to be able to take off", () => {
        const LHR = new Airport("LHR")
        const JFK = new Airport("JFK")
        const plane = new Plane
        LHR.land(plane)
        plane.outbound(LHR)
        plane.inbound(JFK)
        plane.takeOff()
        expect(LHR.planes.length).toBe(0)
        expect(JFK.planes.length).toBe(1)
        expect(JFK.planes[0]).toBe(plane)
    })
})

describe("Airport", () => {
    it("should have a name", () => {
        const LHR = new Airport("LHR")
        const JFK = new Airport("JFK")
        expect(LHR.name).toEqual("LHR")
        expect(JFK.name).toEqual("JFK")
    })

    it("should be able to land planes", () => {
        const LHR = new Airport("LHR")
        const plane = new Plane
        LHR.land(plane)
        expect(LHR.planes[0]).toBe(plane)
    })
})

describe("Airports system", () => {
    it("can take you where you want to go", () => {
        const passenger = new Passenger("Busola")
        const carryon = new Bag(12)
        const luggage = new Bag(24)
        passenger.addBag(carryon)
        passenger.addBag(luggage)
        console.log(passenger)
        const plane = new Plane
        const LHR = new Airport("LHR")
        const JFK = new Airport("JFK")
        LHR.land(plane)
        plane.outbound(LHR)
        plane.inbound(JFK)
        plane.board([passenger])
        console.log(LHR)
        console.log(JFK)
        plane.takeOff()
        console.log(LHR)
        console.log(JFK)
        expect(JFK.planes[0].passengers[0].name).toEqual("Busola")
        expect(JFK.planes[0].passengers[0].bags[1].weight).toEqual("24kg")
    })
})
