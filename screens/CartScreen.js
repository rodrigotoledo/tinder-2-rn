import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import Header from '../components/Header';

const CartScreen = () => {
  const navigation = useNavigation()
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [phone, setPhone] = useState(null)
  const [scheduledAt, setScheduledAt] = useState(null)
  useEffect(async () => {
    try {
      axios.get('https://sheltered-stream-66928.herokuapp.com/api/carts', {
        params: { uuid: user.uid }
      })
      .then(function (response) {
        if(response.data.length === 0){
          navigation.push("Home")
        }else{
          setProducts(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    } catch (error) {
      console.log(error.getMessage())
    }
  },[])

  const remove = (product_id) => {
    axios.post('https://sheltered-stream-66928.herokuapp.com/api/carts', {
      uuid: user.uid,
      product_id: product_id,
      remove: true
    })
    .then(function (response) {
      navigation.push('Cart')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const scheduled = () => {
    if(name === null || phone === null || address === null || scheduledAt === null){
      Alert.alert('Preencha os campos para agendar')
    }else{
      axios.post('https://sheltered-stream-66928.herokuapp.com/api/carts/finish', {
        uuid: user.uid,
        name: name,
        phone: phone,
        address: address,
        scheduled_at: scheduledAt
      })
      .then(function (response) {
        Alert.alert('Agendamento efetuado com sucesso, enviaremos seu condicional')
        navigation.push('Home')
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={tw`flex flex-row mb-4 bg-white `}>
        <Image style={tw`w-20 h-20`} source={{uri: item.product.photo}} />
        <View style={tw`ml-2`}>
          <Text style={tw`font-bold`}>{item.product.name}</Text>
          <Text>{item.product.description}</Text>
          <Text>{item.product.size}</Text>
          <TouchableOpacity onPress={() => remove(item.product.id)}>
            <Ionicons name="close-circle-outline" size={20} color="#e06796" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header />

      <View style={tw`flex-1 -mt-6`}>
        <View style={tw`relative bg-transparent h-6/7 items-center justify-center m-10`}>
          <View style={tw`border border-pink-500 rounded-xl p-2 w-full flex-1`}>
            <FlatList style={tw`h-20 mb-4 w-full`} data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id} />
            <TextInput textContentType='name' placeholder='Nome' style={tw`bg-white p-4 rounded-xl mb-2`} onChangeText={setName} value={name} />
            <TextInput textContentType='telephoneNumber' placeholder='Telefone' style={tw`bg-white p-4 rounded-xl mb-2`} onChangeText={setPhone} value={phone} />
            <TextInput textContentType='fullStreetAddress' placeholder='Endereço de entrega' style={tw`bg-white p-4 rounded-xl mb-2`} onChangeText={setAddress} value={address} />
            <TextInput placeholder='Horário' style={tw`bg-white p-4 rounded-xl mb-2`} onChangeText={setScheduledAt} value={scheduledAt} />
          </View>
        </View>

      </View>
      <View style={tw`items-center`}>
        <TouchableOpacity onPress={scheduled} style={tw`items-center mb-1 rounded-xl bg-pink-500 w-40`}><Text style={tw`font-bold text-white text-xl p-2`}>Agendar</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen