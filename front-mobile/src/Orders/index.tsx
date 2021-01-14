import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../../api';
import { Order } from '../../types';
import Header from '../Header';
import OrderCard from '../OrderCard';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const hadleOnPress = (order: Order) => { navigation.navigate('OrdersDetails', { order }) };

  const fetchData = () => {
    setisLoading(true);
    fetchOrders()
      .then(response => setOrders(response.data))
      .catch(() => Alert.alert("Houve um erro ao listar os pedidos."))
      .finally(() => setisLoading(false));
  };

  useEffect(() => {
    if(isFocused){
      fetchData();
    }

  }, [isFocused]);

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {
          isLoading ? (<Text>Buscando Pedidos...</Text>
          ) : (
              orders.map(order => (
                <TouchableWithoutFeedback key={order.id} onPress={() => hadleOnPress(order)}>
                  <OrderCard order={order} />
                </TouchableWithoutFeedback>
              )))}
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  }
});

export default Orders;
