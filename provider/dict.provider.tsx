import { ReactNode, useMemo } from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type DictData = {
  content: string
  fromLang: string
  toLang: string
  point: number
  createdAt: Date
  updatedAt: Date
}

export type DictState = { dict: Record<string, DictData | undefined> }

export type DictAction = {
  upsertVocab: (vocab: string, data: DictData) => string
  deleteVocab: (vocab: string) => string
}

/**
 * Store
 */

export const useDict = create<DictState & DictAction>()(
  immer((set) => ({
    dict: {},
    upsertVocab: (vocab: string, data: DictData) => {
      set((state) => {
        state.dict[vocab] = data
      })
      return vocab
    },
    deleteVocab: (vocab: string) => {
      set((state) => {
        delete state.dict[vocab]
      })
      return vocab
    },
  })),
)

/**
 * Hooks
 */

export const useVocab = (vocab: string) => {
  const data = useDict((state) => state.dict[vocab])
  return data
}

export const useVocabs = () => {
  const dict = useDict((state) => state.dict)
  const vocabs = useMemo(() => Object.keys(dict), [dict])
  return vocabs
}

export const useUpsertVocab = () => {
  const upsertVocab = useDict((state) => state.upsertVocab)
  return upsertVocab
}

export const useDeleteVocab = () => {
  const deleteVocab = useDict((state) => state.deleteVocab)
  return deleteVocab
}

/**
 * Provider
 */

export default function DictProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
