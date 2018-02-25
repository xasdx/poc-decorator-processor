import scanr from "./scanr"

let main = module.parent

let instances = []
let wiringQueue = []

let onAssembled = null
let entryPoint = null

let containr = {
  component: name => findInstance(name, true)
}

function Component(target, name, descriptor) {
  console.log(`Found @Component on type ${target.name}`)
  createInstance(target)
}

function Wired(target, name, descriptor) {
  console.log(`Found @Wired on field ${name}`)
  wiringQueue.push({ target: target, name: name, descriptor: descriptor })
}

function ComponentScanner(path) {
  return (target, name, descriptor) => {
    path = path || __dirname
    console.log(`ComponentScanner on path ${path}`)
    scanr().forEach(path => require(path))
  }
}

function EntryPoint(entryPointMethod) {
  return (target, name, descriptor) => {
    console.log(`Defining entry point as ${target.name}::${entryPointMethod}`)
    entryPoint = { component: target.name, method: entryPointMethod }
  }
}

function createInstance(target) {
  let instanceEntry = { id: target.name, instance: new target() }
  instances.push(instanceEntry)
}

function findInstance(id, ignoreCase) {
  let instanceEntry = instances.filter(i => {
    if (ignoreCase) { return i.id.toLowerCase() === id.toLowerCase() }
               else { return i.id === id }
  })[0]
  if (!instanceEntry) { throw `Could not find matching instance for ${id}` }
  return instanceEntry.instance
}

function wireInstances() {
  while (true) {
    let wiringTask = wiringQueue.pop()
    if (!wiringTask) { return }
    
    let fieldName = wiringTask.name
    let className = wiringTask.target.constructor.name
    let classInstance = findInstance(className, true)
    let instance = findInstance(fieldName, true)
    
    console.log(`Wiring ${instance.constructor.name} to ${className}::${fieldName}`)
    classInstance[fieldName] = instance
  }
}

function assembled(callback) { onAssembled = callback }

setTimeout(() => {
  console.log(`Node modules have been loaded: ${main.loaded}`)
  wireInstances()
  console.log(`Container has been assembled`)
  if (onAssembled) {
    onAssembled(containr)
  } else if (entryPoint) {
    let entryPointComponent = findInstance(entryPoint.component, true)
    entryPointComponent[entryPoint.method](containr)
  } else {
    console.log("No application entry point has been defined")
  }
}, 1)

export { Component, Wired, ComponentScanner, EntryPoint, assembled }
