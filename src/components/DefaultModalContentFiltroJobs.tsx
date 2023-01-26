import React, { useEffect, useState } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';

const DefaultModalContent = (props) => {
    const [checkedMadrid, setCheckedJornada] = useState(props.tipoMadrid);  
    const [selectedValue, setSelectedValue] = useState(props.tipoJornada);
    useEffect(() => {
      props.parentTipoJornada(selectedValue);
      props.parentMadrid(checkedMadrid);
    }, [props])

  const checkfunctionMadrid = () => {
    setCheckedJornada(!checkedMadrid);
    //return checkedMadrid;
  };
  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Filtrar 📲</Text>
      <View
      style={{borderWidth: 1, borderColor: '#EAEAEA',   borderRadius: 10}}>
      <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 220}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Todos" value="" />
          <Picker.Item label="Jornada Completa" value="Completa" />
          <Picker.Item label="Tiempo parcial" value="Tiempo parcial" />
        </Picker>
      </View>
      <CheckBox
        center
        title='Madrid'
        iconRight
        iconType='material'
        checkedIcon='clear'
        uncheckedIcon='add'
        checkedColor='red'
        uncheckedColor='green'
        checked={checkedMadrid}
        onPress={checkfunctionMadrid}

      />
      <View> 
      <Button testID={'close-button'} onPress={props.onPress} title="Close" />
      </View>
    </View>
  );
}
//Meterle un style de Row
//Botón de limpiar filtro. //Ponerle color gris
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight:'bold'
  },
});
export default DefaultModalContent;