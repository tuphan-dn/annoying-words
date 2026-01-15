import { useTheme } from '@/hooks/use-theme'
import {
  LiquidGlassView,
  type LiquidGlassViewProps,
} from '@callstack/liquid-glass'
import { StyleSheet, TextInput } from 'react-native'

export type SearchInputProps = {
  text?: string
  onChangeText?: (text: string) => void
  onSubmitText?: (text: string) => void
  effect?: LiquidGlassViewProps['effect']
}

export default function SearchInput({
  text = '',
  onChangeText = () => {},
  onSubmitText = () => {},
  effect = 'regular',
}: SearchInputProps) {
  const theme = useTheme()

  return (
    <LiquidGlassView
      style={styles.container}
      effect={effect}
      colorScheme={theme}
      interactive
    >
      <TextInput
        style={styles.input}
        placeholder="annoying words"
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={(e) => onSubmitText(e.nativeEvent.text)}
        autoCapitalize="none"
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
        textContentType="none"
        autoFocus
      />
    </LiquidGlassView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 32,
    borderRadius: '100%',
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 700,
  },
})
