import {
  isLiquidGlassSupported,
  LiquidGlassContainerView,
  LiquidGlassView,
} from '@callstack/liquid-glass'
import { Text, TextInput, View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

const AnimatedLiquidGlassView =
  Animated.createAnimatedComponent(LiquidGlassView)
const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedText = Animated.createAnimatedComponent(Text)

const SPACING = 24
const DRAGGER_SIZE = 80

export type LookUpBarProps = {
  value?: string
  onChangeText?: (text: string) => void
  onActivate?: (text: string) => void
}

export default function LookUpBar({
  value = '',
  onChangeText = () => {},
  onActivate = () => {},
}: LookUpBarProps) {
  const dragging = useSharedValue(false)
  const activated = useSharedValue(false)
  const translateX = useSharedValue(0)
  const inputWidth = useSharedValue(0)

  const pan = Gesture.Pan()
    .onUpdate(({ translationX }) => {
      const x = Math.min(Math.max(translationX, 0), inputWidth.value)
      translateX.value = x
      dragging.value = x > 0
      if (x >= inputWidth.value) {
        activated.value = true
        // Rumble the phone here
      }
    })
    .onEnd(() => {
      translateX.value = withSpring(0)
      dragging.value = false
      if (activated.value) {
        scheduleOnRN(onActivate, value)
        activated.value = false
      }
    })

  const draggerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))
  const textStyle = useAnimatedStyle(() => ({
    color: activated.value ? 'rgba(0, 122, 255, 1)' : 'rgba(255, 255, 255, 1)',
  }))
  const draggerContainerStyle = useAnimatedStyle(() => ({
    width: dragging.value ? 0 : 'auto',
  }))

  return (
    <GestureHandlerRootView style={{ width: '100%' }}>
      <LiquidGlassContainerView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        spacing={SPACING}
      >
        <GestureDetector gesture={pan}>
          <AnimatedView style={draggerContainerStyle}>
            <AnimatedLiquidGlassView
              style={[
                {
                  height: DRAGGER_SIZE,
                  aspectRatio: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '100%',
                },
                !isLiquidGlassSupported && {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                },
                draggerStyle,
              ]}
              effect="clear"
              interactive
            >
              <AnimatedText
                style={[
                  {
                    fontSize: 24,
                    fontWeight: 700,
                    // color: 'rgba(0, 0, 0, 0.6)',
                  },
                  textStyle,
                ]}
              >
                S
              </AnimatedText>
            </AnimatedLiquidGlassView>
          </AnimatedView>
        </GestureDetector>
        <AnimatedLiquidGlassView
          layout={LinearTransition.springify().damping(60).stiffness(600)}
          onLayout={(e) => {
            inputWidth.value =
              e.nativeEvent.layout.width - DRAGGER_SIZE - SPACING
          }}
          style={[
            {
              flex: 1,
              height: '100%',
              borderRadius: '100%',
              padding: 24,
              gap: 16,
            },
            !isLiquidGlassSupported && {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
          ]}
          effect="clear"
          interactive
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 24,
              fontWeight: 700,
            }}
            placeholder="..."
            value={value}
            onChangeText={onChangeText}
            autoCapitalize="none"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            textContentType="none"
            autoFocus
          />
        </AnimatedLiquidGlassView>
      </LiquidGlassContainerView>
    </GestureHandlerRootView>
  )
}
