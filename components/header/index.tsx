import { LiquidGlassContainerView } from '@callstack/liquid-glass'
import { StyleSheet } from 'react-native'
import SearchInput from './search-input'
import SyncButton from './sync-btn'

const EFFECT = 'clear'

export type HeaderProps = {
  text?: string
  onChangeText?: (text: string) => void
  onSubmitText?: (text: string) => void
}

export default function Header({
  text = '',
  onChangeText = () => {},
  onSubmitText = () => {},
}: HeaderProps) {
  return (
    <LiquidGlassContainerView style={styles.header} spacing={24}>
      <SearchInput
        text={text}
        onChangeText={onChangeText}
        onSubmitText={onSubmitText}
        effect={EFFECT}
      />
      <SyncButton effect={EFFECT} />
    </LiquidGlassContainerView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
  },
})
