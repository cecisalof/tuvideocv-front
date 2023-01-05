import { useState, useEffect } from 'react';
import React from "react";
import { SafeAreaView, FlatList, TextInput, Button, StyleSheet, Text, View, Image, ToastAndroid, ImageBackground, Dimensions, TouchableHighlight, TouchableOpacity} from "react-native";
import Header from '../components/Header'
import Constants from 'expo-constants'
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
import DefaultModalContent from '../components/DefaultModalContent';
import DefaultModalContentOptions from '../components/DefaultModalContentOptions';
//import { EndOfLineState } from 'typescript';
import {
  API_URL, BASE_URL,
} from '../axios/config';

const axios = require('axios').default;

const App = (props) => {
  const { data, token } = props;
  //console.log("ApplicationJobs", data);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [numeroOriginal, setNumeroTotal]  = useState("0");
  const [stateFounded, setStateFounded]  = useState("0");
  const [modalVarTipoJornada, setModalVarTipoJornada]  = useState("");
  const [modalVarMadrid, setModalVarMadrid]  = useState(false);
  const [itemSelectedModalOptions, setItemSelectedModalOptions] = useState("Nothing");
  const [itemSelectedChanged, setItemSelectedChanged] = useState("false");
  const [itemUUID, setItemUUID] = useState("item");
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
  /*useEffect(() => {
    console.log("Entra en el useEffect ------------------------------Favorite-Candidate");
    if (itemSelectedModalOptions == "Favorite"){ //Seleccionar el id de la tarjeta que estas pulsando para poder mandarlo.
      addFavorite();
      //https://03kn1e2eb5.execute-api.eu-west-1.amazonaws.com/pro/api/jobs/95913257-f212-4840-9076-ebf76f949beb/favorite
    } else if (itemSelectedModalOptions == "Candidate"){
      addCandidature();
    } else if (itemSelectedModalOptions == "Nothing"){
    }     
  }, [itemSelectedModalOptions]);*/
    /*useEffect(() => {
    console.log("Entra en el useEffect ------------------------------Favorite-Candidate ", itemSelectedChanged);
    console.log("Entra en el useEffectTIPO ------------------------------Favorite-Candidate ", itemSelectedModalOptions);

    if (itemSelectedModalOptions == "Favorite" && itemSelectedChanged == true){ //Seleccionar el id de la tarjeta que estas pulsando para poder mandarlo.
      console.log("DENTRO DE ADD FAVORITE");
      addFavorite();
      //https://03kn1e2eb5.execute-api.eu-west-1.amazonaws.com/pro/api/jobs/95913257-f212-4840-9076-ebf76f949beb/favorite
    } else if (itemSelectedModalOptions == "Candidate" && itemSelectedChanged == true){
      console.log("DENTRO DE ADD APPLY CANDIDATE");
      addCandidature();
    } 
    setItemSelectedChanged(false);
  }, [itemSelectedChanged]);*/



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

      console.log("El token en jobs favorite es "+token);
      console.log("LA URL ES  "+BASE_URL + "jobs/"+itemUUID+"/favorite");
      //const response = await axios.post(BASE_URL + "jobs/95913257-f212-4840-9076-ebf76f949beb/favorite",
      //const response = await axios.post("https://03kn1e2eb5.execute-api.eu-west-1.amazonaws.com/pro/api/jobs/95913257-f212-4840-9076-ebf76f949beb/favorite", "",
      const response = await axios.post(BASE_URL + "jobs/"+itemUUID+"/favorite", "",
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }).then(function (response) {
          console.log(response);
          const data = response.data;
          console.log("**JOB FAVORITE** "+data);
          ToastAndroid.show("¡Agregado correctamente a favoritos!", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
          console.log("Error del favorites", error);
          ToastAndroid.show("Ha sucedido un error", ToastAndroid.SHORT);
        });
  };

  const addCandidature = async () => {
      //const response = await axios.get(BASE_URL + "jobs/"+item.UUID+"/favorite",
      //const response = await axios.post(BASE_URL + "jobs/95913257-f212-4840-9076-ebf76f949beb/apply", "",
      const response = await axios.post(BASE_URL + "jobs/"+itemUUID+"/apply", "",
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }).then(function (response) {
          console.log(response);
          const data = response.data;
          console.log("**JOB CANDIDATE** "+data);
          ToastAndroid.show("¡Agregado correctamente a candidaturas!", ToastAndroid.SHORT);
        })
        .catch(function (error) {
          console.log(error);
          console.log("Error del candidaturas", error);
          ToastAndroid.show("Ha sucedido un error", ToastAndroid.SHORT);
        });
  };

  const searchFilterFunctionModalDialogJornada = (text) => {
    // Check if searched text is not blank
    //if (text) { //Crear un botón de borrar en el dialog.
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
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
        } else if (text == "Madrid"){ //Deberiamos comprobar si Madrid es true o false para poder limpiar o no la busqueda TODO: ADRI // DEBERIA UNIFICARLO TODO EN UN SOLO FUNCTION PARA QUE FUNCIONE CORRECTAMENTE
          itemData = item.address
          ? item.address.toUpperCase()
          : ''.toUpperCase();
          textData = "MADRID";
        }
        return itemData.indexOf(textData) > -1;
      });
      setStateFounded(newData.length);
      setFilteredDataSource(newData);
      //setSearch(modalVarTipoJornada);
   /* } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setStateFounded(numeroOriginal);
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }*/
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleOptions, setModalVisibleOptions] = useState(false);

  const toggleModal = () => {
    console.log("Entra en toggle modal", isModalVisible);
    setModalVisible(!isModalVisible); 
  };
  const toggleModalOptions = () => {
    console.log("Entra en toggle toggleModalOptions", isModalVisibleOptions);
    setModalVisibleOptions(!isModalVisibleOptions);
    //setIdJob = idEmpleo;
  };
  const toggleModalOptionsPressed = (childData) => {
    console.log("Entra en PRESSED y el modal1 es ", itemSelectedChanged);
    setModalVisibleOptions(!isModalVisibleOptions);
    setItemSelectedChanged(true);
    setItemSelectedModalOptions(childData);
    console.log("Entra en PRESSED y el modal2 es ", childData);
    if (childData == "Favorite"){ //Seleccionar el id de la tarjeta que estas pulsando para poder mandarlo.
      console.log("DENTRO DE ADD FAVORITE");
      addFavorite();
      //https://03kn1e2eb5.execute-api.eu-west-1.amazonaws.com/pro/api/jobs/95913257-f212-4840-9076-ebf76f949beb/favorite
    } else if (childData == "Candidate"){
      console.log("DENTRO DE ADD APPLY CANDIDATE");
      addCandidature();
    } 
    //setIdJob = idEmpleo;
  };
  const toggleModalOptionsUUID = (uuid) => {
    console.log("Entra en toggle toggleModalOptions", isModalVisibleOptions);
    console.log("Entra en el uuid del toggleModal", uuid);
    setItemUUID(uuid);
    console.log("Entra en el itemUUID del toggleModal", itemUUID); //N
    //También mirar que no funciona el link base de codepremium al hacer la llamada (y sustituir el de amazon) TODO
    setModalVisibleOptions(!isModalVisibleOptions);
    //setIdJob = idEmpleo;
  };
 /* const itemSelectedFromModalOptions = (childData) => {
    console.log("Entra in itemSelectedFromModalOptions BEFORE "+itemSelectedModalOptions);
    console.log("Entra in itemSelectedFromModalOptions "+childData);
    setItemSelectedModalOptions(childData); 
  };*/
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  const onPressLearnMore = () => {
    console.log("CheckValores", "CheckValoresModal");
    console.log("Valor Picker Tipo jornada", modalVarTipoJornada);
    console.log("Valor Madrid", modalVarMadrid);
  };
  const callbackTipoJornada = (childData) => {
    console.log("Entra tipo jornada", "Entra tipo jornada");
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
                            color="grey"
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
                            color="grey"
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
      <View  key={index} style={[styles.cardGeneric, index%3==0 ? styles.cardBlue : index%3==1 ? styles.cardGreen : styles.cardPurple]}>
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
                    color='#B2B2B4'/>
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