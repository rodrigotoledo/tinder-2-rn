import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';


const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  // const { user } = useAuth()
  const user = true;
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator