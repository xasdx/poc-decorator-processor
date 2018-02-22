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

export { Component, Wired, findInstance }
