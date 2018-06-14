class Enum {
  constructor(value) {
    this.value = value
    this.key = Symbol(value)
  }

  equals(other) {
    if (other instanceof Enum) {
      return this.key === other.key
    }
    return false
  }

  any(...enums) {
    return enums.some(e => this.equals(e))
  }

  except(...enums) {
    return enums.every(e => !this.equals(e))
  }
}

class Enumerable {
  constructor(object) {
    Object.keys(object).forEach((key) => {
      this[key.toUpperCase()] = this._build(object[key])
    })
    this.values().forEach(e => e.parent = this)
  }

  values() {
    return Object.values(this).filter(e => typeof e !== 'function')
  }

  valueOf(value) {
    return this.values().find(e => e.value === value) || this._build(value)
  }

  _build(value) {
    const validate = (target, name) => {
      const variable = name.toUpperCase().slice(2);
      const comparable = target.parent[variable]
      return target.equals(comparable)
    }

    const instance = new Enum(value)

    return new Proxy(instance, {
      get: (target, name) => {
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name)
        }
        return validate(target, name)
      }
    })
  }
}

function enumerate(obj) {
  return new Enumerable(obj)
}
