import React from 'react';
import { View, TouchableOpacity, Image} from 'react-native';
import { Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

function CustomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { statusStyle } = styles;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <LinearGradient
    colors={['#08dee5', '#FF7EFD', '#7357FF']}
    start={[0, 0]}
    end={[1, 0]}
    style={statusStyle}
  >
    <View style={{ flexDirection: 'row',height:80,justifyContent:"center",alignItems:"center"}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (route.name === 'Play') {
            return (
                <TouchableOpacity
                  key="1"
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ flex: 1, alignItems:"center" }}>
                  <Image source={isFocused ? require('../assets/icons/vacancies-h.png') : require('../assets/icons/vacancies.png')} style={isFocused ? styles.image_Play : styles.image} />
                  
                </TouchableOpacity>
            );
          } else if (route.name === 'MyHome') {
            return (
                <TouchableOpacity
                  key="2"
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ flex: 1, alignItems:"center" }}>
                  <Image source={isFocused ? require('../assets/icons/video-h.png') : require('../assets/icons/video.png')} style={isFocused ? styles.image_Play : styles.image} />
                  
                </TouchableOpacity>
            );
          } else if (route.name === 'Me') {
            return (
                <TouchableOpacity
                  key="3"
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ flex: 1, alignItems:"center" }}>
                  <Image source={isFocused ? require('../assets/icons/applications-h.png') : require('../assets/icons/applications.png')} style={isFocused ? styles.image_Play : styles.image} />

                  
                </TouchableOpacity>
            );
          }

      })}
    </View>
    </LinearGradient>
    
  );
  
}

export default CustomTabBar;


const styles = {
  statusStyle: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
  },
  image: {
    width: 40,
    height: 40,
  },
  image_Play: {
    width: 55,
    height: 55,
  },
};
