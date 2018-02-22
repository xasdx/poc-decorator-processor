let main = module.parent

let instances = []
let wiringQueue = []

function Component(target, name, descriptor) {
  console.log(`Found @Component on type ${target.name}`)
  createInstance(target)
}

function Wired(target, name, descriptor) {
  console.log(`Found @Wired on field ${name}`)
  wiringQueue.push({ target: target, name: name, descriptor: descriptor })
}

function createInstance(target) {
  let instanceEntry = { id: target.name, instance: new target() }
  instances.push(instanceEntry)
}

function findInstance(id) {
  let instanceEntry = instances.filter(i => i.id === id)[0]
  if (!instanceEntry) { throw `Could not find matching instance for ${id}` }
  return instanceEntry.instance
}

function wireInstances() {
  while (true) {
    let wiringTask = wiringQueue.pop()
    if (!wiringTask) { return }
    
    let fieldName = wiringTask.name
    let className = wiringTask.target.constructor.name
    let classInstance = findInstance(className)
    let instance = findInstance(fieldName)
    
    console.log(`Wiring ${instance.constructor.name} to ${className}::${fieldName}`)
    classInstance[fieldName] = instance
  }
}

console.log(`Node modules have been loaded: ${main.loaded}`)
wireInstances()

export { Component, Wired, findInstance }
