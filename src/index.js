import { Component, Wired } from "./processor"

import "./comp-a"
import "./comp-b"

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
