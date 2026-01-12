import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/use-theme'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  transparent?: boolean
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  transparent = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor('background', {
    light: lightColor,
    dark: darkColor,
  })

  return (
    <View
      style={[
        { backgroundColor: transparent ? 'transparent' : backgroundColor },
        style,
      ]}
      {...otherProps}
    />
  )
}
