class Enum {
  constructor(key) {
    this.key = key
  }

  equals(other) {
    if (other instanceof Enum) {
      return this.key === other.key
    }
  }

  any(...enums) {
    enums.some(e => this.equals(e))
  }

  get value() {
    return this.key
  }
}

function validate(target, name) {
  // expect "isXXXX"
  const key = name.toUpperCase().slice(2);
  const comparerable = target._findByKey(key)
  return target.equals(comparerable)
}


function build(key) {
  const instance = new Enum(key)

  return new Proxy(instance, {
    get: (target, name) => {
      if (Reflect.has(target, name)) {
        return Reflect.get(target, name)
      }
      return validate(target, name)
    }
  })
}

function enumerate(obj) {
  const enums = {}

  Object.keys(obj).forEach((key) => {
    enums[key.toUpperCase()] = build(obj[key])
  })

  enums['values'] = () => {
    return Object.values(enums).filter(e => typeof e !== 'function')
  }

  enums['from'] = key => enums.values().find(e => e.key === key) || build(key)

  const findByKey = key => enums[key]

  enums.values().forEach((e) => {
    e._findByKey = findByKey
  })

  return enums
}
