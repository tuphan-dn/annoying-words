import { useTheme } from '@/hooks/use-theme'
import DictProvider from '@/provider/dict.provider'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const unstable_settings = {
  anchor: '(home)',
}

export default function RootLayout() {
  const theme = useTheme()

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <DictProvider>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', headerShown: false }}
            />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </DictProvider>
    </ThemeProvider>
  )
}
