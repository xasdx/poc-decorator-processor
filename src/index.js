import containr, { Component, Wired, discoverComponents } from "./processor"

discoverComponents()

@Component
class Application {

  @Wired
  compA = null

  @Wired
  compB = null

  test() {
    let hello = this.compA.sayHello()
    let result = this.compB.greetTheWorld(hello)
    console.log(result)
  }
}

containr(registry => {
  let app = registry.getByName("application")
  app.test()
})
