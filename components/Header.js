import React from 'react'
import { View, Linking, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const navigation = useNavigation()
  const { user, logout } = useAuth()

  const openWhatsApp = () => {
  // Open the custom settings if the app has one
    let url =
      "whatsapp://send?phone=553334931091";
    Linking.openURL(url)
      .then(data => {
        console.log("WhatsApp Opened successfully " + data);
      })
      .catch(() => {
        alert("Ops, WhatsApp não está instalado no seu celular");
      });
  }
  return (
    <View style={tw`flex-row items-center justify-between p-5`}>
      <TouchableOpacity onPress={logout}>
        {/* <Image source={{ uri: user.photoURL}} style={tw`h-10 w-10 rounded-full`} /> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("Home")} style={tw`p-2 bg-white rounded-xl`}>
        <Image source={require('../logo.jpeg')} style={tw`h-14 w-14`} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {openWhatsApp()}}>
        <Ionicons name="chatbubbles-sharp" size={30} color="#e06796" />
      </TouchableOpacity>
    </View>
  )
}

export default Header