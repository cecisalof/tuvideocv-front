import { useState, useEffect } from 'react';
import React from "react";
import { SafeAreaView, FlatList, TextInput, StyleSheet, Text, View, Image, ToastAndroid, Dimensions, TouchableOpacity} from "react-native";
import Header from '../components/Header'
import Constants from 'expo-constants'
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
import DefaultModalContent from '../components/DefaultModalContentFiltroJobs';
import DefaultModalContentOptions from '../components/DefaultModalContentOptarJobs';
import {
  BASE_URL,
} from '../axios/config';

const axios = require('axios');

const App = (props) => {
  const { data, token } = props;
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [numeroOriginal, setNumeroTotal]  = useState("0");
  const [stateFounded, setStateFounded]  = useState("0");
  const [modalVarTipoJornada, setModalVarTipoJornada]  = useState("");
  const [modalVarMadrid, setModalVarMadrid]  = useState(false);
  const [itemSelectedModalOptions, setItemSelectedModalOptions] = useState("Nothing");
  const [itemUUID, setItemUUID] = useState("item");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleOptions, setModalVisibleOptions] = useState(false);
  //const [idJob, setIdJob] = useState("Nothing");
  useEffect(() => {
    if (data) {
      setMasterDataSource(data)
      setFilteredDataSource(data)
      setNumeroTotal(Object.keys(data).length)
      setStateFounded(Object.keys(data).length)

    }      
  }, [masterDataSource]);
  useEffect(() => {
    if (data) {
      searchFilterFunctionModalDialogJornada("Jornada");
    }      
  }, [modalVarTipoJornada]);
  useEffect(() => {
    if (data) {
      searchFilterFunctionModalDialogJornada("Madrid");
    }      
  }, [modalVarMadrid]);
  useEffect(() => { 
  }, [itemUUID]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        //setIteraciones(parseInt(iteracionesFiltro)+1);
        const itemData = item.title
          ? item.title.toUpperCase()
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
  const addFavorite = async () => {
      const response = await axios.post(BASE_URL + "jobs/"+itemUUID+"/favorite", "",
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }).then(function (response) {
          const data = response.data;
          ToastAndroid.show("¡Agregado correctamente a favoritos!", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log("Error del favorites", error);
          ToastAndroid.show("Ha sucedido un error", ToastAndroid.SHORT);
        });
  };

  const addCandidature = async () => {
      const response = await axios.post(BASE_URL + "jobs/"+itemUUID+"/apply", "",
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }).then(function (response) {
          const data = response.data;
          ToastAndroid.show("¡Agregado correctamente a candidaturas!", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log("Error del candidaturas", error);
          ToastAndroid.show("Ha sucedido un error", ToastAndroid.SHORT);
        });
  };

  const searchFilterFunctionModalDialogJornada = (text) => {
      const newData = masterDataSource.filter(function (item) {
        var itemData = "";
        var textData="";
        // Applying filter for the inserted text in search bar
        //setIteraciones(parseInt(iteracionesFiltro)+1);
        if (text == "Jornada"){
          itemData = item.work_time
          ? item.work_time.toUpperCase()
          : ''.toUpperCase();
          textData = modalVarTipoJornada.toUpperCase();
        } else if (text == "Madrid"){ 
          itemData = item.address
          ? item.address.toUpperCase()
          : ''.toUpperCase();
          textData = "MADRID";
        }
        return itemData.indexOf(textData) > -1;
      });
      setStateFounded(newData.length);
      setFilteredDataSource(newData);
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible); 
  };
  const toggleModalOptions = () => {
    setModalVisibleOptions(!isModalVisibleOptions);
    //setIdJob = idEmpleo;
  };
  const toggleModalOptionsPressed = (childData) => {
    setModalVisibleOptions(!isModalVisibleOptions);
    setItemSelectedModalOptions(childData);
    if (childData == "Favorite"){ 
      addFavorite();
    } else if (childData == "Candidate"){
      addCandidature();
    } 
  };
  const toggleModalOptionsUUID = (uuid) => {
    setItemUUID(uuid);
    setModalVisibleOptions(!isModalVisibleOptions);
  };
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  const callbackTipoJornada = (childData) => {
    setModalVarTipoJornada(childData);
    //searchFilterFunctionModalDialog();
  };
  const callbackMadrid = (childData) => {
    setModalVarMadrid(childData);
  };
  return (
  <View style={styles.container}>
  <Image source={require('../assets/icons/vacancies-c.png')} style={styles.imageMaletin} >  
  </Image>
  <Header>Job vacancies</Header>
  <Modal
        testID={'modal'}
        backdropColor="#262121"
        useNativeDriver={true}
        isVisible={isModalVisible}
        hideModalContentWhileAnimating={true}
        onBackdropPress={toggleModal}>
        <DefaultModalContent tipoJornada = {modalVarTipoJornada} tipoMadrid = {modalVarMadrid} parentTipoJornada = {callbackTipoJornada} parentMadrid = {callbackMadrid} onPress={toggleModal}/>
      </Modal>
  <SafeAreaView style={styles.containerList}>
    <View style={styles.viewFilter}>
        <View style={[styles.cardH2, styles.cardH2_Search]}>
            <View style={styles.iconFiltro}>
                  <Icon
                            name="search-web"
                            type="material-community"
                            size={45}
                            color="#7E7777"
                            />
            </View>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                //underlineColorAndroid="transparent"
                placeholder="Search Here"
              />
        </View>
        <View style={[styles.cardH2, styles.cardH2_Filter]}>
          <TouchableOpacity onPress={()=>{
              toggleModal()
              }}
              //underlayColor="#DDDDDD"
              >
                  <Icon
                            name="order-bool-descending"
                            type="material-community"
                            underlayColor="white"
                            size={35}
                            color="#7E7777"
                            />

        </TouchableOpacity>
        </View>
    </View>
    <Modal
        testID={'modalOptions'}
        backdropColor="#A59DD5"
        useNativeDriver={true}
        isVisible={isModalVisibleOptions}
        hideModalContentWhileAnimating={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={toggleModalOptions}>
        <DefaultModalContentOptions onPress={toggleModalOptionsPressed} itemSelected={itemSelectedModalOptions} idJob={itemUUID}/>
        </Modal>
    <FlatList
      data={filteredDataSource}
      renderItem={({ item, index }) =>
      <View  key={index} style={[styles.cardGeneric, index%3==0 ? styles.cardBlue : index%3==1 ? styles.cardPurple : styles.cardPink]}>
        <View style={styles.itemImageV2}>
        <Image source={require('../assets/jobopening.png')} style={styles.itemImage} />
        </View>
        <View>
            <Text style={[styles.itemGeneric, styles.itemName]}>{item.title}</Text>
            <View style={styles.itemLocation}>
              <Icon
                    name='place'
                    type="material-icons"
                    size={35}
                    color='#7E7777'/>
              <Text style={[styles.itemGeneric, styles.itemPlace]}>{item.address}</Text>
            </View>
            <Text style={[styles.item, styles.itemContrato]}>{item.work_time}</Text>
        </View>
                <TouchableOpacity onPress={()=>{
                  toggleModalOptionsUUID(item.uuid);
                  //Llamar a las opciones de guardar u optar
                  }}
                  //underlayColor="#DDDDDD"
                  style={styles.itemIconOption}
                  >
                    <Icon
                                    name="options"
                                    type="simple-line-icon"
                                    size={24}
                                    color="black"
                                    />
                </TouchableOpacity>
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
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom:40, margin: 10, fontWeight:'bold' }}>Fin de ofertas</Text>
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
    fontWeight: "bold",
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
    fontSize: 15,
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
});
export default App;