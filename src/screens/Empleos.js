import { useState, useEffect } from 'react';
import React from "react";
import { SafeAreaView, FlatList, TextInput, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableHighlight} from "react-native";
import Header from '../components/Header'
import Constants from 'expo-constants'
import { Icon } from "react-native-elements";


const App = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [numeroOriginal, setNumeroTotal]  = useState("0");
  const [stateFounded, setStateFounded]  = useState("0");
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        setStateFounded(Object.keys(responseJson).length);
        setNumeroTotal(Object.keys(responseJson).length);
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        console.error(error);
        throw error;
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        //setIteraciones(parseInt(iteracionesFiltro)+1);
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setStateFounded(newData.length);
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setStateFounded(numeroOriginal);
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const searchFilterButton = () => { //Prueba puntual. El botón deberá abrir una ventana de dialogo. Duplicada función de arriba, seguramente se pueda optimizar mejor.
    const text = 'Shanna@melissa.tv';
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.email
          ? item.email.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  return (
  <View style={styles.container}>
  <Image source={require('../assets/icons/vacancies-c.png')} style={styles.imageMaletin} >  
  </Image>
  <Header>Job vacancies</Header>
  <SafeAreaView style={styles.containerList}>
    <View style={styles.viewFilter}>
        <View style={[styles.cardH2, styles.cardH2_Search]}>
            <View style={styles.iconFiltro}>
                  <Icon
                            name="search-web"
                            type="material-community"
                            size={45}
                            color="grey"
                            />
            </View>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
              />
        </View>
        <View style={[styles.cardH2, styles.cardH2_Filter]}>
          <TouchableHighlight onPress={()=>{
              searchFilterButton()
              }}>
                  <Icon
                            name="order-bool-descending"
                            type="material-community"
                            size={35}
                            color="grey"
                            />

        </TouchableHighlight>
        </View>
    </View>
    <FlatList
      data={filteredDataSource}
      renderItem={({ item }) =>
      <View style={[styles.cardGeneric, item.id%3==0 ? styles.cardBlue : item.id%3==1 ? styles.cardGreen : styles.cardPurple]}>
        <Image source={require('../assets/icons/starbuckslogo.png')} style={styles.itemImage} />
        <View>
            <Text style={[styles.itemGeneric, styles.itemName]}>{item.name}</Text>
            <View style={styles.itemLocation}>
              <Icon
                    name='place'
                    type="material-icons"
                    size={35}
                    color='#B2B2B4'/>
              <Text style={[styles.itemGeneric, styles.itemPlace]}>Madrid</Text>
            </View>
            <Text style={[styles.item, styles.itemContrato]}>Contrato Indefinido</Text>
        </View>
       </View>
      }
      keyExtractor={(item) => item.id}
      //ItemSeparatorComponent={myItemSeparator}
      ListEmptyComponent={myListEmpty}
      ListHeaderComponent={() => (

     <Text style={{ fontSize: 20,marginTop:20,fontWeight:'bold'}}>
         Found {stateFounded} positions
      </Text>           

      )}
      ListFooterComponent={() => (
        <Text style={{ fontSize: 30, textAlign: "center",marginBottom:80,fontWeight:'bold' }}>Fin de ofertas</Text>
      )}
    />
  </SafeAreaView>
  </View>
  );
};
 
const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    marginTop: 5,
    fontSize: 30,
    width: Dimensions.get('window').width-40,
  },
  item: {
    padding: 20,
    marginTop: 5,
    fontSize: 15,
  },
  itemContrato: {
    marginTop: -10,
  },
  textInputStyle:{
    fontSize: 20,
    width: '100%',
  },
  cardGeneric:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 20,
    height: 120,
  },
  cardBlue: {
    backgroundColor: '#b4fffe',
  },
  cardPurple: {
    backgroundColor: '#F7CBFF',
  },
  cardGreen: {
    backgroundColor: '#D4FFCB',
  },
  viewFilter:{
    flexDirection: "row",
  },
  cardH2: {
    flexDirection: "row",
    marginTop: -10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    height: 50,
  },
  cardH2_Search: {
    flex: 3,
    marginRight: 10,
  },
  cardH2_Filter: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFiltro: {
    marginLeft: 10,
  },
  itemLocation: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: -10,
  },
  itemGeneric: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold"
  },
  itemName: {
    padding: 20,
  },
  itemPlace: {
    color: "#B2B2B4",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 80/ 2,
    marginRight: 10,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: Constants.statusBarHeight,
    paddingTop: 10
  },
imageMaletin: {
  width: 80,
  height: 80,
},
});
export default App;
