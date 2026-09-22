import { describe, expect, it } from 'vitest'
import type { Post } from '../types/post'
import postsSlice, { initialPostsState, postCreated, postDeleted, postUpdated } from './postsSlice'

const reducer = postsSlice.reducer
const serverPost: Post = { id: 1, userId: 1, title: 'Servidor', body: 'Contenido' }
const localPost: Post = { id: 101, userId: 2, title: 'Local', body: 'Contenido' }

describe('postsSlice', () => {
  it('guarda los posts creados al inicio y avanza el siguiente id', () => {
    const state = reducer(initialPostsState, postCreated(localPost))
    expect(state.created).toEqual([localPost])
    expect(state.nextId).toBe(102)
  })

  it('edita un post local en su sitio y uno del servidor como override', () => {
    let state = reducer(initialPostsState, postCreated(localPost))
    state = reducer(state, postUpdated({ ...localPost, title: 'Local editado' }))
    state = reducer(state, postUpdated({ ...serverPost, title: 'Servidor editado' }))

    expect(state.created[0]!.title).toBe('Local editado')
    expect(state.updated[1]!.title).toBe('Servidor editado')
  })

  it('elimina un post local y marca como eliminado uno del servidor', () => {
    let state = reducer(initialPostsState, postCreated(localPost))
    state = reducer(state, postUpdated({ ...serverPost, title: 'Editado' }))
    state = reducer(state, postDeleted(localPost))
    state = reducer(state, postDeleted(serverPost))

    expect(state.created).toEqual([])
    expect(state.deleted[1]).toEqual(serverPost)
    expect(state.updated[1]).toBeUndefined()
  })
})
