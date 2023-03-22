export interface Warp<T> {
  (update?: T): T
}

export let warp =
  <T>(state: T): Warp<T> =>
  (update?: T) =>
    update === undefined ? state : (state = update)
