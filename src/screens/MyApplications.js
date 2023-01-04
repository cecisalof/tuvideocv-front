import { useState, useEffect } from 'react';
import React from "react";
import { SafeAreaView, FlatList, TextInput, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableHighlight} from "react-native";
import Header from '../components/Header'
import Constants from 'expo-constants'
import { Icon } from "react-native-elements";

const App = (props) => {
  const { dataJobFavorite, dataJobCandidates} = props;
  const [dataShow, setDataShow] = useState(dataJobCandidates);
  console.log("Application3 Favorite ", dataJobFavorite);
  console.log("Application3 Candidate ", dataJobCandidates);
  console.log("Application3 ------SHOW ", dataShow);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [lado, setLado]  = useState("0");
  const [stateFounded, setStateFounded]  = useState("0");
  //const [imagenSello, setImagenSello]  = useState("../assets/jobcandidate1.png");

  useEffect(() => {
    if (dataShow) {
      setMasterDataSource(dataShow)
      setFilteredDataSource(dataShow)
      setStateFounded(Object.keys(dataShow).length)
    }    
  }, [dataShow]);

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  return (
  <View style={styles.container}>
  <Image source={require('../assets/icons/applications-c.png')} style={styles.imageMaletin} >  
  </Image>
  <Header>My applications</Header>
    <View style={styles.topMenu}>
          <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=>{
                setLado(1);
                setDataShow(dataJobFavorite);
                }}>
            <Text style={{fontSize: 18,marginTop:20,fontWeight:'bold', marginRight: 15}}>
                Favorites {stateFounded}
            </Text>  
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=>{
              setLado(0);
              setDataShow(dataJobCandidates);
                }}> 
          <Text style={{ fontSize: 18,marginTop:20,fontWeight:'bold', marginLeft: 15}}>
              Applied {stateFounded}
          </Text> 
          </TouchableHighlight>
    </View>
    <View style={styles.imageBarra}>
      <Image source={lado==0 ? require('../assets/icons/rsz_barra-derecha.png') : require('../assets/icons/rsz_barra-izquierda.png')}/>
    </View>
  <SafeAreaView style={styles.containerList}>
    <FlatList
          data={masterDataSource}
      renderItem={({ item, index }) =>
      <View  key={index} style={[styles.cardGeneric, index%3==0 ? styles.cardBlue : index%3==1 ? styles.cardGreen : styles.cardPurple]}>
        <View style={styles.itemImageV2}>
        <Image source={lado==0 ? require('../assets/jobcandidate1.png') : require('../assets/jobfavorite.png')} style={styles.itemImage} />
        </View>
        <View>
            <Text style={[styles.itemGeneric, styles.itemName]}>{item.title}</Text>
            <View style={styles.itemLocation}>
              <Icon
                    name='place'
                    type="material-icons"
                    size={35}
                    color='#B2B2B4'/>
              <Text style={[styles.itemGeneric, styles.itemPlace]}>{item.address}</Text>
            </View>
            <Text style={[styles.item, styles.itemContrato]}>{item.work_time}</Text>
        </View>
       </View>
      }
      keyExtractor={(item, index) => index}
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
    //justifyContent: 'center',
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
    marginBottom: 14,
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
  itemRow: {
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
    paddingTop: 5,
  },
  itemIconOption: {
    marginLeft: 35,
    marginTop: 8,
  },
  itemPlace: {
    color: "#B2B2B4",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 80/ 2,
    marginRight: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  itemImageV2: {
    alignItems: 'center',
    marginTop: 18,
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
imageBarra: {
  alignItems: 'center',
},
topMenu:{
  flexDirection: "row",
},
});
export default App;