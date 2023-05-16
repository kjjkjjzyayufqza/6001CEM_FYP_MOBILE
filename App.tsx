/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Button, NativeBaseProvider} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {HomeScreen} from './src/page/Home/HomeScreen'
import {ChatScreen} from './src/page/Chat/ChatScreen'
import {AccountScreen} from './src/page/Account/AccountScreen'
import {navigationRef} from './src/components/RootNavigation'
import {SearchListScreen} from './src/page/SearchList/SearchListScreen'
import {LoginScreen} from './src/page/Login/LoginScreen'
import {ForgotPSScreen} from './src/page/ForgotPS/ForgotPSScreen'
import {ReSetPasswordScreen} from './src/page/ForgotPS/ReSetPasswordScreen'
import {RegisterScreen} from './src/page/Register/RegisterScreen'
import {Detail} from './src/page/Detail/Detail'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function MainTabView () {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#00B9FF',
            height: 45,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {},
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          headerStyle: {
            backgroundColor: '#00B9FF',
            height: 45,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {},
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <Entypo name='chat' color={color} size={size} />
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                PubSub.publish('ClearAllMessage', 'null')
              }}
              color='#ffffff'
              variant={'ghost'}>
              <MaterialCommunityIcons
                name='chat-remove-outline'
                size={20}
                color={'white'}
              />
            </Button>
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          headerStyle: {
            backgroundColor: '#00B9FF',
            height: 45,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {},
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function App (): JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name='Main'
            component={MainTabView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='SearchList'
            component={SearchListScreen}
            options={{
              headerStyle: {
                backgroundColor: '#00B9FF',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {},
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='ForgotPSScreen'
            component={ForgotPSScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='ReSetPasswordScreen'
            component={ReSetPasswordScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Detail'
            component={Detail}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: 'black',
            }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App
