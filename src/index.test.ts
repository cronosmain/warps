import { expect, test } from 'bun:test'
import { warp } from './index.js'

test('warp’s state doesn’t change if pass `undefined` each time', () => {
  let w = warp(42)
  expect(w()).toBe(42)
  expect(w()).toBe(42)
  expect(w()).toBe(42)
})

test('warp’s state changes if pass non-`undefined` value', () => {
  let w = warp(0)
  w(42)
  expect(w()).toBe(42)
})

test('when change warp’s state, it returns the new state', () => {
  let w = warp(0)
  expect(w(42)).toBe(42)
})
