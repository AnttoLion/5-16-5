import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import TouchNavGroup from '../../common/components/navpanel/TouchNavGroup';

import ReservationsList from './ReservationsList';
import CreateReservation from './CreateReservation';
import { ReservationDetailsView } from './ReservationDetailsView';
import { CreateReservationDetails } from './CreateReservationDetails';
import BasicLayout from '../../common/components/CustomLayout/BasicLayout';

interface Props {
  navigation: any;
  goBack: () => void;
}

const Reservations = ({ navigation, goBack }: Props) => {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Reservations List");

  const handleItemClick = (itemName, data = null) => {
    setSelectedItem(itemName);
    setData(data);
  };

  if (selectedItem) {
    switch (selectedItem) {
      case 'Create Reservations':
        return (
          <CreateReservation
            openReservationScreen={handleItemClick}
          />
        );
      case 'Reservations List':
        return (
          <ReservationsList
            openReservationScreen={handleItemClick}
          />
        );
      case 'Reservation Details View':
        return (
          <ReservationDetailsView
            openReservationScreen={handleItemClick}
            data={data}
          />
        );
      case 'CreateReservation Detail':
        return (
          <CreateReservationDetails
            openReservationScreen={handleItemClick}
            data={data}
          />
        );
      default:
        return (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#d54545',
              paddingHorizontal: 10,
              paddingVertical: 2,
              height: 28,
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 100,
            }}
          >
            <TouchableOpacity onPress={() => handleItemClick(null, null)}>
              <Text>{'< Back'}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 28 }}>{selectedItem}</Text>
          </View>
        );
    }
  }

  return (
    <BasicLayout goBack={goBack} navigation={navigation} screenName={'Reservations'}>
      <ScrollView>
        <View style={styles.container}>
          <TouchNavGroup
            sectionTitle="Create Resservation"
            items={[{ title: 'Create Reservations', icon: 'check' }]}
            handleItemClick={handleItemClick}
          />
          <TouchNavGroup
            sectionTitle="Reservations List"
            items={[{ title: 'Reservations List', icon: 'table' }]}
            handleItemClick={handleItemClick}
          />
        </View>
      </ScrollView>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '90%',
    maxWidth: 1000,
    margin: 'auto',
    marginTop: 40,
  },
});

export default Reservations;
