export default (containr) => {
  return (target, name, descriptor) => {
    console.log(`Found @Wired on field ${name}`)
    containr.wiringQueue.push({ target: target, name: name, descriptor: descriptor })
  }
}
