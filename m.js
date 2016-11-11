/***************\
|****************|
|*****_****_*****|
|****|*\**//*****|
|****|*|\/|*|****|
|****|*|**|*|****|
|****|*|**|*|****|
|****************|
|****************|
\****************/

const allCaps = () => {
  return this.toString().toUpperCase()
}

String.prototype.allCaps = allCaps
Number.prototype.allCaps = allCaps

String.prototype.cap = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const types = [
  'array',
  'object',
  'string',
  'number',
  'boolean',
  'function',
  'undefined'
]

const bools = [
  true,
  false
]

class M {

  static objToArray(obj) {
    return Object.keys(obj).map(key => obj[key])
  }

  static toArray(one, more) {
    return (one && !more && typeof arguments[0] === 'object')
      ? M.objToArray(arguments[0])
      : M.objToArray(arguments)
  }

  static arrOrArgs(arr, args) {
    return (Array.isArray(arr)) ? arr : M.toArray(args)
  }

  static allAre(func, arr) {
    let args = arguments && arguments.slice(0)
    let list = M.arrOrArgs(arr, args)
    list.map(func)
  }

  // Map/Reduce/Filter methods:
  static both(a, b) {
    return a && b
  }

  static either(a, b) {
    return a || b
  }

  static equal(a, b) {
    return a.allCaps() === b.allCaps()
  }

  static all(arr) {
    return M.arrOrArgs(arr, arguments).reduce(M.both)
  }

  static any(arr) {
    return M.arrOrArgs(arr, arguments).reduce(M.either)
  }

  static equals(arr, thing) {
    let args = M.arrOrArgs(arr, arguments)
    thing = (this.typeOf(arr) == 'array') ? args.pop : thing
    return args.reduce(M.equal)
  }

  static of(type, list=[], thing) {
    return list
    .map(item => {
      console.log('thing/item/outcome - ',thing, item, M.equals(thing, item))
      M.equals(thing, item)
    })
    .reduce(M[type])
  }

  static typeOf(thing) {
    let type = typeof thing
    switch (type) {
      case 'object':
        return (Array.isArray(thing)) ? 'array' : type
      case 'number':
        return type
      case 'string':
        return type
      case 'undefined':
        return type
      default:
        return typeof thing
    }
  }

  static areSameType(arr) {
    arr = M.arrOrArgs(arr, arguments)
    return arr(arr, arguments).map(item => M.is(M.typeOf(arr[0]), item))
  }

  static isNOf(list, thing) {
    return list
    .map(item => M.is(item, thing))
    .filter(M.is(true, thing))
    .length
  }

  static isAnyOf(list, thing) {
    return M.of('either', list, thing)
  }

  static isAllOf(list, thing) {
    return M.of('both', list, thing)
  }

  static is(candidate, thing) {
    if (M.isAnyOf(types, candidate)) {
      return M.typeOf(thing) === candidate
    } else
    if (M.isAnyOf(bools, candidate)) {
      return !!thing === candidate
    } else {
      return M.equal(thing, candidate)
    }
  }

}

module.exports = M
