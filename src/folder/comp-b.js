import { Component, Wired } from "../processor"

@Component
class CompB {

  @Wired
  compC = null

  greetTheWorld(greeting) {
    return `${greeting} world`
  }
}
