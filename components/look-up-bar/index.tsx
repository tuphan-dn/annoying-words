import {
  isLiquidGlassSupported,
  LiquidGlassContainerView,
  LiquidGlassView,
} from '@callstack/liquid-glass'
import { useState } from 'react'
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

const AnimatedLiquidGlassView =
  Animated.createAnimatedComponent(LiquidGlassView)
const AnimatedView = Animated.createAnimatedComponent(View)

export default function LookUpBar() {
  const [word, setWord] = useState('')
  const dragging = useSharedValue(false)
  const translateX = useSharedValue(0)
  const pan = Gesture.Pan()
    .onUpdate(({ translationX }) => {
      const x = Math.max(translationX, 0)
      translateX.value = x
      dragging.value = x > 0
    })
    .onEnd(() => {
      translateX.value = withSpring(0)
      dragging.value = false
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const widthStyle = useAnimatedStyle(() => ({
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
        spacing={24}
      >
        <GestureDetector gesture={pan}>
          <AnimatedView style={widthStyle}>
            <AnimatedLiquidGlassView
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
                  backgroundColor: 'rgba(255,255,255,0.5)',
                },
                animatedStyle,
              ]}
              effect="clear"
              interactive
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                S
              </Text>
            </AnimatedLiquidGlassView>
          </AnimatedView>
        </GestureDetector>
        <AnimatedLiquidGlassView
          layout={LinearTransition.springify().damping(60).stiffness(600)}
          style={[
            {
              flex: 1,
              height: '100%',
              borderRadius: '100%',
              padding: 24,
              gap: 16,
            },
            !isLiquidGlassSupported && {
              backgroundColor: 'rgba(255,255,255,0.5)',
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
            placeholder="Enter text"
            value={word}
            onChangeText={setWord}
            autoCapitalize="none"
            placeholderTextColor="rgba(0,0,0,0.6)"
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
