import Header from '@/components/header'
import Vocab from '@/components/vocab'
import { useUpsertVocab, useVocabs } from '@/provider/dict.provider'
import { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const [text, onText] = useState('')
  const insets = useSafeAreaInsets()
  const upsertVocab = useUpsertVocab()

  const onSubmitText = useCallback(
    (value: string) => {
      upsertVocab(value, {
        content: 'hello world',
        fromLang: 'en',
        toLang: 'vi',
        createdAt: new Date(),
        updatedAt: new Date(),
        point: 0,
      })
    },
    [upsertVocab],
  )

  const vocabs = useVocabs()

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
        <Header text={text} onChangeText={onText} onSubmitText={onSubmitText} />
      </View>
      <ScrollView
        contentContainerStyle={styles.stackContainer}
        showsVerticalScrollIndicator={false}
      >
        {vocabs.map((vocab) => (
          <Vocab key={vocab} text={vocab} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  stackContainer: {
    paddingHorizontal: 32,
    paddingVertical: 148,
    flexDirection: 'column',
    alignContent: 'flex-start',
    gap: 16,
  },
})
