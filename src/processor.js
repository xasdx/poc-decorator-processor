import scanr from "./scanr"

let main = module.parent

let instances = []
let wiringQueue = []

let onAssembled = null

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

function discoverComponents() {
  let files = scanr()
  files.forEach(path => require(path))
}

setTimeout(() => {
  console.log(`Node modules have been loaded: ${main.loaded}`)
  wireInstances()
  onAssembled({
    getByName: (name) => findInstance(name, true)
  })
}, 1)

export { Component, Wired, findInstance, discoverComponents }
export default assembled
