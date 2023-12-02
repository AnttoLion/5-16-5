import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import TouchNavGroup from '../../common/components/navpanel/TouchNavGroup';

import PriceTables from './pricetables/PriceTables';
import PriceLogic from './pricelogic/PriceLogic';
import Seasons from './seasons/Seasons';
import Brands from './brands/Brands';
import ProductCategories from './product/productcategories/ProductCategories';

const Inventory = ({initalItem = null}) => {
    const [selectedItem, setSelectedItem] = useState(initalItem);
    
    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
    };
    
    if(selectedItem) {
        switch (selectedItem) {
            case 'Add/manage items':
                return <ProductCategories/>;
            case 'Price tables':
                return <PriceTables/>;
            case 'Price Logic':
                return <PriceLogic/>;
            case 'Seasons':
                return <Seasons/>;
            case 'Brands':
                return <Brands/>;
            default:
                return (
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginTop: 100, }}>
                        <TouchableOpacity  style={{ border:'1px solid gray', marginRight: 20, paddingHorizontal: 10, paddingVertical:2, marginTop: 8, height: 28, }} onPress={() => handleItemClick(null)}>
                            <Text>{'<'}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 28 }}>{selectedItem}</Text>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            <TouchNavGroup sectionTitle="General" items={[
                { title: "Add/manage items" },
                { title: "Search" }
            ]} handleItemClick={handleItemClick} />
            <TouchNavGroup sectionTitle="Price Management" items={[
                { title: "Price tables" },
                { title: "Price Logic" },
                { title: "Seasons" },
                { title: "Brands" }
            ]} handleItemClick={handleItemClick} />
            <TouchNavGroup sectionTitle="Bulk Update" items={[
                { title: "Bulk Update" }
            ]} handleItemClick={handleItemClick} />
            <TouchNavGroup sectionTitle="Print" items={[
                { title: "Print snapshot" }
            ]} handleItemClick={handleItemClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '80%',
        maxWidth: 1000,
        margin: 'auto',
        marginTop: 80,
    },
});

export default Inventory;
