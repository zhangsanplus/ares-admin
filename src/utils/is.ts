const { toString } = Object.prototype

export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}

export function isString(val: any): val is string {
  return is(val, 'String')
}

export function isNumber(val: any): val is number {
  return is(val, 'Number')
}

export function isBoolean(val: any): val is boolean {
  return is(val, 'Boolean')
}

export function isObject(val: any): val is Record<string, any> {
  return val !== null && is(val, 'Object')
}

export function isEmptyObject(val: any): val is boolean {
  return isObject(val) && Object.keys(val).length === 0
}

export function isArray(val: any): val is any[] {
  return val && Array.isArray(val)
}

export function isNull(val: any): val is null {
  return is(val, 'Null')
}

export function isUndefined(val: any): val is undefined {
  return is(val, 'Undefined')
}

export function isFunction(val: any): val is (...args: any[]) => any {
  return typeof val === 'function'
}

export function isFile(val: any): val is File {
  return is(val, 'File')
}

export function isBlob(val: any): val is Blob {
  return is(val, 'Blob')
}

export function isRegExp(val: any) {
  return is(val, 'RegExp')
}

export function isExternal(val: any) {
  return /^(https?:|mailto:|tel:)/.test(val)
}
