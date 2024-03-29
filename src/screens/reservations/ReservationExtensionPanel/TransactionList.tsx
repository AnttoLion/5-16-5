import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getReservationDetail, getTransactionsData } from '../../../api/Reservation';

interface Props {
  reservationId: number;
  openAddTransactionModal: ()=>void;
}

const TransactionList = ({reservationId, openAddTransactionModal}:Props) => {
  const [reservationInfo, setReservationInfo] = useState<any>({});
  const [transactionData, setTransactionData] = useState([]);

  useEffect(()=>{
    getTransactionsData({reservation_id:reservationId}, (jsonRes, status, error) => {
      switch (status) {
        case 200:
          setTransactionData(jsonRes);
          break;
        default:
          setTransactionData([]);
          break;
      }
    });
  }, [reservationId, openAddTransactionModal])

  useEffect(() => {
    if (reservationId) {
      getReservationDetail(reservationId, (jsonRes, status, error) => {
        switch (status) {
          case 200:
            if(jsonRes.total_price == 0){
              jsonRes.total_price = jsonRes.subtotal + jsonRes.tax_amount - jsonRes.discount_amount;
            }
            setReservationInfo(jsonRes);
            break;
          default:
            setReservationInfo({});
            break;
        }
      });
    }
  }, [reservationId, openAddTransactionModal]);
  
  const renderItems = () => {
    return transactionData.map((transaction) => (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:8}}>
          <Text>{'customer_email@example.com'}</Text>
          <Text>{new Date(transaction.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text>{transaction.method}</Text>
          <Text>{"$" + transaction.amount}</Text>
        </View>
      </View>
    ));
  };
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:6, marginBottom:12}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:16, marginRight:8}}>Total</Text>
          <Text style={{fontSize:16, marginRight:60}}>
            {parseFloat(reservationInfo.total_price).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
          </Text>
          <Text style={{fontSize:16, marginRight:8}}>Paid</Text>
          <Text style={{fontSize:16, marginRight:60}}>{parseFloat(reservationInfo.paid || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</Text>
        </View>
        <TouchableOpacity style={[styles.outLineButton, {borderColor:'#28A745'}]} onPress={()=>{openAddTransactionModal()}}>
          <View style={{flexDirection:'row'}}>
            <FontAwesome5 name={'plus'} size={14} color="#28A745" style={{marginRight:10, marginTop:3}}/>
            <Text style={[styles.outlineBtnText, {color:'#28A745'}]}>Add transaction</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingHorizontal:6, height:250}}>
        <View>
          {renderItems()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    // paddingHorizontal: 2,
    width:'100%',
    height:'100%',
  },
  transactionItem: {
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outLineButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#6c757d',
    marginLeft: 13,
  },
  outlineBtnText: {
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    // color:'#6c757d',
    // marginLeft: 10,
  },
});

export default TransactionList;
