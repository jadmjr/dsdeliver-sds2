import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, Alert, Linking } from 'react-native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { confirmDelivery } from '../../api';
import { Order } from '../../types';
import Header from '../Header';
import OrderCard from '../OrderCard';

type Props = {
  route: {
    params: {
      order: Order;
    }
  }
}

function OrderDetails({ route }: Props) {
  const { order } = route.params;
  const navigation = useNavigation();
  

  const hadleOnCancel = () => { navigation.navigate('Orders') };

  const hadleConfirmDelivery = () => {
    confirmDelivery(order.id)
    .then(()=>{
      navigation.navigate('Orders');
      Alert.alert(`PEDIDO ${order.id} CONFIRMADO COM SUCESSO!`)
    })
    .catch(()=> {
      Alert.alert(`ERRO AO CONFIRMAR PEDIDO: ${order.id}`)
    } )
  };

  const hadleStartNavigation = () => { 
    Linking.openURL(`https://www.google.com.br/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button}>
          <Text style={styles.buttonText} onPress={hadleStartNavigation}>
            INICIAR NAVEGAÇÃO
         </Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Text style={styles.buttonText} onPress={hadleConfirmDelivery}>
            CONFIRMAR ENTREGA
         </Text>
        </RectButton>
        <RectButton style={styles.button} onPress={hadleOnCancel}>
          <Text style={styles.buttonText}>
            CANCELAR
         </Text>
        </RectButton>
      </View>

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold'
  }
});

export default OrderDetails;
