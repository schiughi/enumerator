class Enum {
  constructor(key) {
    this.key = key
  }

  equals(other) {
    return this === other
  }

  any(...enums) {
    enums.some(e => this.equals(e))
  }

  get value() {
    return this.key.toUpperCase()
  }
}

function enumerate(obj) {
  const enums = {}

  Object.keys(status).forEach((key) => {
    enums[key] = new Enum(status[key])
  })

  const values = () => {
    return Object.values(enums).filter(e => typeof e !== 'function')
  }

  const from = key => enums.values().find(e => e.key === key)

  enums['values'] = values
  enums['from'] = from

  return enums
}
