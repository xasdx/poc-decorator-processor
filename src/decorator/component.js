let createInstance = (target, containr) => {
  let instanceEntry = { id: target.name, instance: new target() }
  containr.instances.push(instanceEntry)
}

export default (containr) => {
  return (target, name, descriptor) => {
    console.log(`Found @Component on type ${target.name}`)
    createInstance(target, containr)
  }
}
