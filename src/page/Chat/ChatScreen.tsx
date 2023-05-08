import {Button, HStack, Image, Input, ScrollView, Text, View} from 'native-base'
import React, {useCallback, useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Message,
  MessageProps,
  Send,
} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChatMessageInput from '../../components/ChatMessageInput'
import {postBotMessage} from '../../API'
import {BotMessageBox, makeid} from '../../components/BotMessageBox'
import {QuickReplies} from 'react-native-gifted-chat/lib/QuickReplies'

export const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  // const [customInputMessage, setCustomInputMessage] = useState<string>('')

  const [needClearValue, setNeedClearValue] = useState<boolean>(false)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: (
          <View>
            <Text>Hello, What can i help you?</Text>
          </View>
        ) as any,
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: [
            {
              title: 'My skin is itchy, can you help me?',
              value: 'My skin is itchy, can you help me?',
            },
            {
              title: 'My stomach feels uncomfortable.',
              value: 'My stomach feels uncomfortable.',
            },
          ],
        },
      },
    ])
    return () => {
      setMessages([])
    }
  }, [])

  const onSend = useCallback((messages: any[] = []) => {
    setNeedClearValue(true)
    const messageString = messages[0]?.text
    setMessages(previousMessages => {
      messages = [
        {
          _id: makeid(20),
          createdAt: new Date(),
          text: <BotMessageBox sendMessage={messageString} />,
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
            // overflow: 'hidden'
          },
        }}
        renderMessageText={e => {
          const user: string = e.currentMessage?.user.name ?? 'abc'
          if (user == 'Bot') {
            return <View p={2}>{e.currentMessage?.text}</View>
          } else {
            return (
              <View p={2}>
                <Text color={'white'}>{e.currentMessage?.text}</Text>
              </View>
            )
          }
        }}
      />
    )
  }

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        onQuickReply={quickReply => {
          const value = {
            _id: makeid(20),
            createdAt: new Date(),
            text: quickReply[0].value,
            user: {_id: 1, name: 'TEST1'},
          }
          onSend([value])
        }}
        messages={messages}
        renderUsernameOnMessage={true}
        renderAvatar={() => (
          <Image
            size={10}
            borderRadius={20}
            alt='icon'
            source={require('../../../public/img/botIcon.png')}></Image>
        )}
        onSend={messages => {
          console.log(messages)
          onSend(messages)
        }}
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
