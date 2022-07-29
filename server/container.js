const createContainer = (hentity) => {
  const registered = new Map()
  const resolved = new Map()

  return {
    register(name, resolver) {
      if (registered.has(name)) throw new Error(`Register already service: ${name}`)

      registered.set(name, resolver)
      return this
    },
    get(name, args) {
      if (resolved.has(name)) return resolved.get(name)

      if (registered.has(name)) {
        const resolver = registered.get(name)
        if (typeof resolver === 'function') {
          resolved.set(name, resolver({ hentity }, args))
        } else {
          resolved.set(name, resolver)
        }

        return resolved.get(name)
      }

      throw new Error(`Could not resolve service: ${name}`)
    },
  }
}

module.exports = { createContainer }
