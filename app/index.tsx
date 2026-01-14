import Header from '@/components/header'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const [text, onText] = useState('')
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          {
            width: '100%',
            position: 'absolute',
            top: insets.top,
            right: 0,
            zIndex: 2,
            paddingHorizontal: 16,
          },
        ]}
      >
        <Header text={text} onChangeText={onText} />
      </View>
      <ScrollView
        contentContainerStyle={styles.stackContainer}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  stackContainer: {
    paddingHorizontal: 16,
    paddingVertical: 96,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
