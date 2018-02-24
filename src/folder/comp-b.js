import { Component } from "../processor"

@Component
class CompB {

  greetTheWorld(greeting) {
    return `${greeting} world`
  }
}
