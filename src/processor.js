function Component(target, name, descriptor) {
  console.log(`Found @Component on type ${target.name}`)
}

function Wired(target, name, descriptor) {
  console.log(`Found @Wired on field ${name}`)
}

export { Component, Wired }
