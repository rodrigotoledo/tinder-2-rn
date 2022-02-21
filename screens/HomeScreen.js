import React, { useEffect, useState } from 'react'
import { View, Text, Linking, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import Header from '../components/Header';

const HomeScreen = () => {
  const navigation = useNavigation()
  const { user, logout } = useAuth()
  const [cards, setCards] = useState([])
  const [products, setProducts] = useState([])
  // const uid = user.uid;
  const uid = 'lhYfNUOukkVvIvrI9sdKqvpOh0n1';
  //
  useEffect(async () => {
    try {
      const {data} = await axios('https://sheltered-stream-66928.herokuapp.com/products/api')
      setCards(data)
    } catch (error) {
      console.log(error.getMessage())
    }
  },[])

  useEffect(() => {
    console.log(products)
  },[products])

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header />

      <View style={tw`flex-1 -mt-6`}>

        { products.length == cards.length ?
          <View style={tw`relative bg-transparent h-3/4 items-center justify-center`}>
            <Text style={tw`self-center font-bold text-xl`}>Ops... sem produtos</Text>
          </View>
           :
           <>
          <Text style={tw`absolute mt-10 self-center`}>Arraste para a direita para adicionar e para a esquerda para excluir</Text>
          <Swiper
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(swiper) => {
              const product = cards[swiper]
              axios.post('https://sheltered-stream-66928.herokuapp.com/api/carts', {
                uuid: uid,
                // uuid: user.uid,
                product_id: product.id,
                remove: true
              })
              .then(function (response) {
                setProducts(prevArray => [...prevArray, product.id])
              })
              .catch(function (error) {
                console.log(error);
              });
            }}
            onSwipedRight={(swiper) => {
              const product = cards[swiper]
              axios.post('https://sheltered-stream-66928.herokuapp.com/api/carts', {
                uuid: uid,
                // uuid: user.uid,
                product_id: product.id
              })
              .then(function (response) {
                setProducts(prevArray => [...prevArray, product.id])
              })
              .catch(function (error) {
                console.log(error);
              });
            }}
            onSwipedAll={()=>{
              navigation.push("Cart")
            }}
            overlayLabels={{
              left: {
                title: "Não gostei",
                style: {
                  label: {
                    textAlign: "right",
                    color: "#e06796"
                  }
                }
              },
              right: {
                title: "Eu quero",
                style: {
                  label: {
                    color: "#e06796"
                  }
                }
              }
            }}
            containerStyle={{backgroundColor: 'transparent'}} cards={cards} renderCard={(product) => {
              if(product !== undefined){
              return (
              <View style={tw`relative bg-white h-3/4 rounded-xl`}>
                <Image style={tw`absolute top-0 h-full w-full rounded-xl`} source={{uri: product.photo}} />
                <View style={tw`absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl`}>
                  <View>
                    <Text style={tw`text-xl font-bold`}>{product.name}</Text>
                    <Text>{product.description}</Text>
                  </View>
                  <Text style={tw`text-2xl font-bold`}>{product.size}</Text>
                </View>
              </View>
            )}}} />
            </>
        }

      </View>
      <View style={tw`items-center`}>
        <TouchableOpacity onPress={() => navigation.push("Cart")} style={tw`items-center mb-1 rounded-xl bg-pink-500 w-40`}><Text style={tw`font-bold text-white text-xl p-2`}>Minha sacola</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen