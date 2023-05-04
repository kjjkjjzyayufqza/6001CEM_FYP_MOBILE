/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react'
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  Box,
  Center,
  HStack,
  Image,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import {HomeScreen} from './src/page/Home/HomeScreen'
import {ChatScreen} from './src/page/Chat/ChatScreen'
import {AccountScreen} from './src/page/Account/AccountScreen'

const Tab = createBottomTabNavigator()

function App (): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator>
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#000000',
              headerTitleStyle: {
                display: 'none',
              },
              tabBarIcon: ({color, size}) => (
                <FontAwesome name='home' color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Chat'
            component={ChatScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Entypo name='chat' color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Account'
            component={AccountScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name='account'
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App
