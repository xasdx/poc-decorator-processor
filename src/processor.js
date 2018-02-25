import component from "./decorator/component"
import wired from "./decorator/wired"
import componentScanner from "./decorator/component-scanner"
import entryPoint from "./decorator/entrypoint"

let main = module.parent

let containr = {
  instances: [],
  wiringQueue: [],
  entryPoint: null,
  onAssembled: null,
  component: name => findInstance(name, true)
}

let findInstance = (id, ignoreCase) => {
  let instanceEntry = containr.instances.filter(i => {
    if (ignoreCase) { return i.id.toLowerCase() === id.toLowerCase() }
               else { return i.id === id }
  })[0]
  if (!instanceEntry) { throw `Could not find matching instance for ${id}` }
  return instanceEntry.instance
}

let wireInstances = () => {
  while (true) {
    let wiringTask = containr.wiringQueue.pop()
    if (!wiringTask) { return }
    
    let fieldName = wiringTask.name
    let className = wiringTask.target.constructor.name
    let classInstance = findInstance(className, true)
    let instance = findInstance(fieldName, true)
    
    console.log(`Wiring ${instance.constructor.name} to ${className}::${fieldName}`)
    classInstance[fieldName] = instance
  }
}

let assembled = (callback) => { containr.onAssembled = callback }

setTimeout(() => {
  console.log(`Node modules have been loaded: ${main.loaded}`)
  wireInstances()
  console.log(`Container has been assembled`)
  if (containr.onAssembled) {
    containr.onAssembled(containr)
  } else if (containr.entryPoint) {
    let entryPointComponent = findInstance(containr.entryPoint.component, true)
    entryPointComponent[containr.entryPoint.method](containr)
  } else {
    console.log("No application entry point has been defined")
  }
}, 1)

let Component = component(containr)
let Wired = wired(containr)
let EntryPoint = entryPoint(containr)

export { Component, Wired, componentScanner as ComponentScanner, EntryPoint, assembled }
