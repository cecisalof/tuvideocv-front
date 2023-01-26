import { useState, useEffect } from 'react';
import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ToastAndroid, Dimensions, TouchableHighlight} from "react-native";
import Header from '../components/Header'
import Constants from 'expo-constants'
import { Icon } from "react-native-elements";
import Dialog from "react-native-dialog";
import {
  BASE_URL,
} from '../axios/config';

const axios = require('axios');

//Falta que cuando pulse el botón applications refresque y no cuando en applications le de a apply o candidate
//Algo he avanzado.

const App = (props) => {
  const {token} = props;
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [lado, setLado]  = useState("0");
  const [lengthJobFavorite, setLengthJobFavorite]  = useState("0");
  const [lengthJobApply, setLengthJobApply]  = useState("0");
  const [dataJobFavoriteReload, setDataJobFavoriteReload] = useState("");  
  const [dataJobCandidatesReload, setDataJobCandidatesReload] = useState("");  
  const [isModalVisibleOptions, setModalVisibleOptions] = useState(false);
  const [itemUUID, setItemUUID] = useState("item");
  const [varFirstTime, setVarFirstTime] = useState("0");
  useEffect(() => {
      getJobFavorites(token)
      getJobCandidates(token)
      if (masterDataSource.length > 0) {
        if (lado == 1 ) {
          setLengthJobFavorite(Object.keys(masterDataSource).length)
        } else {
          setLengthJobApply(Object.keys(masterDataSource).length)
        }
      }

  }, [masterDataSource]);
  useEffect(() => { 
  }, [itemUUID]);

  const getJobFavorites = async (token, refresh) => {
    try{
      const response = await axios.get(BASE_URL + "favorites",
        {
          headers: {
            'Authorization': `token ${token}`
          }
        })
        const data = response.data;
        if (refresh == "refresh"){ //Si tiene la orden de refresh, directamente se mete en setMaster
          setMasterDataSource(data.results);
          setLengthJobFavorite(data.results.length)
        } else {
          setDataJobFavoriteReload(data.results);
        }
    } catch (error){
      console.log("Error del favorites", error);
    }
  };
  const getJobCandidates = async (token, refresh) => {
    try{
      const response = await axios.get(BASE_URL + "candidates",
        {
          headers: {
            'Authorization': `token ${token}`
          }
        })
        const data = response.data;
        if (refresh == "refresh"){ //Si tiene la orden de refresh, directamente se mete en setMaster
          setMasterDataSource(data.results); 
          setLengthJobFavorite(Object.keys(masterDataSource).length)
          setLengthJobApply(data.results.length)
        } else {
          setDataJobCandidatesReload(data.results);
        }

        if ((masterDataSource.length==0 && varFirstTime ==0)){
          setVarFirstTime(1);
          setMasterDataSource(data.results);
        }
    } catch (error){
      console.log("Error del apply", error);
    }
  };
  const deleteJob = async () => {
    if (lado == 0){
      const response = await axios.delete(BASE_URL + "candidates/"+itemUUID+"/delete", //Hay que cambiarlo por el delete
      {
        headers: {
          'Authorization': `token ${token}`
        }
      }).then(function (response) {
        const data = response.data;
        ToastAndroid.show("¡Eliminado correctamente!", ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log("Error del delete", error);
        ToastAndroid.show("Ha sucedido un error", ToastAndroid.SHORT);
      });
    } else if (lado == 1) {
      const response = await axios.delete(BASE_URL + "favorites/"+itemUUID+"/delete", //Hay que cambiarlo por el delete
      {
        headers: {
          'Authorization': `token ${token}`
        }
      }).then(function (response) {
        const data = response.data;
        ToastAndroid.show("¡Eliminado correctamente!", ToastAndroid.SHORT);
      })
      .catch(function (error) {
        console.log("Error del delete", error);
        ToastAndroid.show("Ha sucedido un error", ToastAndroid.SHORT);
      });
    }
};
  const toggleModalOptionsUUID = (uuid) => {
    setItemUUID(uuid);
    setModalVisibleOptions(!isModalVisibleOptions);
  };
  const ocultarDialogo = () => {
    setModalVisibleOptions(!isModalVisibleOptions);
  }
  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    deleteJob(itemUUID);
    if (lado == 1) { //Refrescar la pantalla 
      getJobFavorites(token, "refresh");
    } else if (lado == 0){
      getJobCandidates(token, "refresh");
    }
    ocultarDialogo();
  };
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No hay trabajos optados a candidatura</Text>
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
                setMasterDataSource(dataJobFavoriteReload);
                }}>
            <Text style={{fontSize: 18,marginTop:20,fontWeight:'bold', marginRight: 15}}>
                Favorites {lengthJobFavorite!=0 ? lengthJobFavorite : ""}
            </Text>  
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=>{
              setLado(0);
              setMasterDataSource(dataJobCandidatesReload);
                }}> 
          <Text style={{ fontSize: 18,marginTop:20,fontWeight:'bold', marginLeft: 15}}>
              Applied {lengthJobApply}
          </Text> 
          </TouchableHighlight>
    </View>
    <View style={styles.imageBarra}>
      <Image source={lado==0 ? require('../assets/icons/rsz_barra-derecha.png') : require('../assets/icons/rsz_barra-izquierda.png')}/>
    </View>
  <SafeAreaView style={styles.containerList}>
  <Dialog.Container visible={isModalVisibleOptions}>
      <Dialog.Title>Eliminación de trabajo</Dialog.Title>
      <Dialog.Description>
        ¿Estás seguro de que quieres eliminar del listado este trabajo?.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={ocultarDialogo}/>
      <Dialog.Button label="Delete" onPress={handleDelete}/>
    </Dialog.Container>
    <FlatList
      data={masterDataSource}
      renderItem={({ item, index }) =>
      <View  key={index} style={[styles.cardGeneric, index%3==0 ? styles.cardBlue : index%3==1 ? styles.cardPink : styles.cardPurple]}>
        <View style={styles.itemImageV2}>
        <Image source={lado==0 ? require('../assets/jobcandidate1.png') : require('../assets/jobfavorite.png')} style={styles.itemImage} />
        </View>
        <View>
            <Text style={[styles.itemGeneric, styles.itemName]}>{item.job.title}</Text>
            <View style={styles.itemLocation}>
              <Icon
                    name='place'
                    type="material-icons"
                    size={35}
                    color='#7E7777'/>
              <Text style={[styles.itemGeneric, styles.itemPlace]}>{item.job.address}</Text>
            </View>
            <Text style={[styles.item, styles.itemContrato]}>{item.job.work_time}</Text>
        </View>
        <TouchableOpacity onPress={()=>{
                  toggleModalOptionsUUID(item.uuid);
                  //Llamar a las opción de borrar
                  }}
                  //underlayColor="#DDDDDD"
                  style={styles.itemIconOption}
                  >
                    <Icon
                                    name="delete"
                                    type="material"
                                    size={24}
                                    color="purple"
                                    />
                </TouchableOpacity>
       </View>
      }
      keyExtractor={(item, index) => index}
      //ItemSeparatorComponent={myItemSeparator}
      ListEmptyComponent={myListEmpty}
      /*ListHeaderComponent={() => (

     <Text style={{ fontSize: 20,marginTop:20,fontWeight:'bold'}}>
         Found {lengthJobFavorite} positions
      </Text>        

      )} 
      ListFooterComponent={() => (
        <Text style={{ fontSize: 30, textAlign: "center",marginBottom:80,fontWeight:'bold' }}>Fin de ofertas</Text>
      )}*/  
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
    backgroundColor: '#CEFDFF',
  },
  cardPurple: {
    backgroundColor: '#DABAFF',
  },
  cardPink: {
    backgroundColor: '#FFC4F7',
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
    color: "#7E7777",
    width: 120,
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