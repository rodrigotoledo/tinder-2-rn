import { useNavigation } from "@react-navigation/core"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc';

const LoginScreen = () => {
  const {signInWithGoogle, loading} = useAuth()

  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 items-center`}>
      <View style={tw`w-50 h-50 mt-80 bg-white items-center justify-center rounded-xl`}>
        <Image source={require('../logo.jpeg')} style={tw`h-40 w-40`} />
      </View>
      <TouchableOpacity style={tw`absolute bottom-40 w-52 bg-pink-500 p-4 rounded-2xl items-center`} onPress={signInWithGoogle}>
        <Text style={tw`text-white`}>Entrar e ver produtos</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen