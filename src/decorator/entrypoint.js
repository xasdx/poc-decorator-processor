export default (containr) => {
  return (entryPointMethod) => {
    return (target, name, descriptor) => {
      console.log(`Defining entry point as ${target.name}::${entryPointMethod}`)
      containr.entryPoint = { component: target.name, method: entryPointMethod }
    }
  }
}
