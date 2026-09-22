import { describe, expect, it } from 'vitest'
import { initialPostsState } from '../store/postsSlice'
import type { Post } from '../types/post'
import { matchesFilters, mergePostsPage } from './mergePosts'

const post = (id: number, userId = 1, title = `Post ${id}`): Post => ({
  id,
  userId,
  title,
  body: 'contenido de prueba',
})

const server = { items: [post(1), post(2), post(3)], total: 100 }

describe('mergePostsPage', () => {
  it('añade los creados al inicio de la primera página y ajusta el total', () => {
    const local = { ...initialPostsState, created: [post(101)] }
    const page = mergePostsPage(server, local, { page: 1 })
    expect(page.items.map((p) => p.id)).toEqual([101, 1, 2, 3])
    expect(page.total).toBe(101)
  })

  it('no repite los creados en otras páginas', () => {
    const local = { ...initialPostsState, created: [post(101)] }
    expect(mergePostsPage(server, local, { page: 2 }).items.map((p) => p.id)).toEqual([1, 2, 3])
  })

  it('aplica ediciones y quita eliminados', () => {
    const local = {
      ...initialPostsState,
      updated: { 1: post(1, 1, 'Editado') },
      deleted: { 2: post(2) },
    }
    const page = mergePostsPage(server, local, { page: 1 })
    expect(page.items.map((p) => p.title)).toEqual(['Editado', 'Post 3'])
    expect(page.total).toBe(99)
  })

  it('solo cuenta los cambios locales que cumplen los filtros', () => {
    const local = { ...initialPostsState, created: [post(101, 2), post(102, 3)] }
    const page = mergePostsPage({ items: [], total: 10 }, local, { page: 1, userId: 2 })
    expect(page.items.map((p) => p.id)).toEqual([101])
    expect(page.total).toBe(11)
  })
})

describe('matchesFilters', () => {
  it('filtra por autor y por texto', () => {
    expect(matchesFilters(post(1, 1, 'Pikachu'), { userId: 1, q: 'pika' })).toBe(true)
    expect(matchesFilters(post(1, 1, 'Pikachu'), { userId: 2 })).toBe(false)
    expect(matchesFilters(post(1, 1, 'Pikachu'), { q: 'charizard' })).toBe(false)
  })
})
