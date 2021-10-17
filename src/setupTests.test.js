const rewire = require("rewire")
const setupTests = rewire("./setupTests")
const noScroll = setupTests.__get__("noScroll")
// @ponicode
describe("noScroll", () => {
    test("0", () => {
        let callFunction = () => {
            noScroll()
        }
    
        expect(callFunction).not.toThrow()
    })
})
