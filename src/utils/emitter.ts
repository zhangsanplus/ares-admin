import mitt from 'mitt'

// https://www.npmjs.com/package/mitt
interface Events extends Record<string | symbol, unknown> {
  foo: string | number
  bar: number
}

export default mitt<Events>()

// emitter.on(foo, (e) => {});
// emitter.emit(foo, 42);
