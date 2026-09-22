import { describe, expect, it } from 'vitest'
import { clampPage, getPageItems } from './pagination'

describe('getPageItems', () => {
  it('muestra todas las páginas cuando son pocas', () => {
    expect(getPageItems(2, 4)).toEqual([1, 2, 3, 4])
  })

  it('usa elipsis alrededor de la página actual', () => {
    expect(getPageItems(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20])
  })

  it('no repite la primera ni la última página', () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, 'ellipsis', 10])
    expect(getPageItems(10, 10)).toEqual([1, 'ellipsis', 9, 10])
  })

  it('funciona con una sola página', () => {
    expect(getPageItems(1, 1)).toEqual([1])
  })
})

describe('clampPage', () => {
  it('mantiene la página dentro del rango', () => {
    expect(clampPage(0, 5)).toBe(1)
    expect(clampPage(9, 5)).toBe(5)
    expect(clampPage(3, 0)).toBe(1)
  })
})
