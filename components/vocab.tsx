import { ThemedText } from './themed-text'

export type VocabProps = {
  text: string
}

export default function Vocab({ text }: VocabProps) {
  return <ThemedText type="subtitle">{text}</ThemedText>
}
