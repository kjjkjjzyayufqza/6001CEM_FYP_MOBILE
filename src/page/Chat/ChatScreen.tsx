import {HStack, Image, Input, Text, View} from 'native-base'
import React, {useCallback, useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChatMessageInput from '../../components/ChatMessageInput'
import {postBotMessage} from '../../API'
import {BotMessageBox} from '../../components/BotMessageBox'

export const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  // const [customInputMessage, setCustomInputMessage] = useState<string>('')

  const [needClearValue, setNeedClearValue] = useState<boolean>(false)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, What can i help you ?',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
      },
    ])
    return () => {
      setMessages([])
    }
  }, [])

  function makeid (length: number) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  const onSend = useCallback((messages: any[] = []) => {
    setNeedClearValue(true)
    const messageString = messages[0]?.text

    setMessages(previousMessages => {
      messages = [
        {
          _id: makeid(20),
          createdAt: new Date(),
          text: (
            <BotMessageBox
              sendMessage={messageString}
              onMessage={res => {
                setMessages(previousMessages => {
                  messages = [
                    {
                      _id: makeid(20),
                      createdAt: new Date(),
                      text: res.data.botMessage,
                      user: {_id: 0, name: 'Bot'},
                    },
                    ...messages,
                  ]
                  return GiftedChat.append(previousMessages, messages)
                })
              }}
            />
          ),
          user: {_id: 0, name: 'Bot'},
        },
        ...messages,
      ]
      return GiftedChat.append(previousMessages, messages)
    })
  }, [])

  const customInputToolbar = (props: any) => {
    // console.log(props.text)
    return (
      // <InputToolbar
      //   {...props}
      //   containerStyle={{
      //     backgroundColor: 'white',
      //     borderTopColor: '#E8E8E8',
      //     borderTopWidth: 1,
      //   }}
      //   renderSend={renderSend}
      // />
      <View>
        <ChatMessageInput
          props={props}
          clearValue={needClearValue}
          onClearValue={() => {
            setNeedClearValue(false)
          }}></ChatMessageInput>
      </View>
    )
  }

  const customBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        // textStyle={{
        //   right: {
        //     color: 'yellow',
        //   },
        // }}
        wrapperStyle={{
          left: {
            backgroundColor: '#FCFFFC',
          },
        }}
      />
    )
  }

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        onQuickReply={() => {}}
        messages={messages}
        renderUsernameOnMessage={true}
        renderAvatar={() => (
          <Image
            size={10}
            borderRadius={20}
            alt='icon'
            source={require('../../../public/img/botIcon.png')}></Image>
        )}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'TEST1',
        }}
        alwaysShowSend
        // renderSend={props => renderSend(props)}
        renderBubble={props => customBubble(props)}
        renderInputToolbar={props => customInputToolbar(props)}
      />
    </View>
  )
}
