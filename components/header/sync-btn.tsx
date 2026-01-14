import { useTheme } from '@/hooks/use-theme'
import {
  isLiquidGlassSupported,
  LiquidGlassView,
  type LiquidGlassViewProps,
} from '@callstack/liquid-glass'
import { router } from 'expo-router'
import { CloudCheckIcon } from 'lucide-react-native'
import { Pressable } from 'react-native'

export type SyncButtonProps = {
  effect?: LiquidGlassViewProps['effect']
}

export default function SyncButton({ effect = 'regular' }: SyncButtonProps) {
  const theme = useTheme()

  return (
    <Pressable onPress={() => router.push('/modal')}>
      <LiquidGlassView
        style={[
          {
            height: 80,
            aspectRatio: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
          },
          !isLiquidGlassSupported && {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
        ]}
        effect={effect}
        colorScheme={theme}
        interactive
      >
        <CloudCheckIcon size={48} pointerEvents="none" />
      </LiquidGlassView>
    </Pressable>
  )
}
