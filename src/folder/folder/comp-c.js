import { Component, Wired } from "../../processor"

@Component
class CompC {
  
  @Wired
  compB = null
  
  helloWorld() {
    console.log(`${this.compB.greetTheWorld("hello")} from CompC`)
  }
}
