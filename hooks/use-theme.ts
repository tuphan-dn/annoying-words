import { useColorScheme } from 'react-native'

import { Colors } from '@/constants/theme'

export const useTheme = () => {
  const theme = useColorScheme() || 'light'
  return theme
}

export type ThemeColorProps = {
  light?: string
  dark?: string
}

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props: ThemeColorProps = {},
) {
  const theme = useTheme()
  return props[theme] || Colors[theme][colorName]
}
