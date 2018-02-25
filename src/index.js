import { Component, Wired, ComponentScanner, EntryPoint } from "./processor"

@Component
@ComponentScanner(__dirname)
@EntryPoint("main")
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
  
  main(containr) {
    containr.component("application").test()
    containr.component("compc").helloWorld()
  }
}
