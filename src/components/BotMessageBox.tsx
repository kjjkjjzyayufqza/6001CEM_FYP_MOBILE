import {Box, Center, Input, ScrollView, Text, View} from 'native-base'
import React, {useEffect, useState} from 'react'
import {postBotMessage} from '../API'
import {AxiosResponse} from 'axios'
import {SafeAreaView} from 'react-native'
import {windowWidth} from '../Dimensions/Dimensions'

interface BotMessageBoxModel {
  sendMessage: string
  onMessage: (e: AxiosResponse) => void
}

export const BotMessageBox: React.FC<BotMessageBoxModel> = ({
  sendMessage,
  onMessage,
}) => {
  const [message, seMessage] = useState<string>('')

  useEffect(() => {
    if (sendMessage) {
      postBotMessage(sendMessage)
        .then(res => {
          console.log('api done')
          seMessage(res.data.botMessage)
        })
        .catch(() => {})
    }
    return () => {}
  }, [])

  return (
    <Text>{message}</Text>
  )
}
