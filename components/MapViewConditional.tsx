import { Platform, Text, View } from 'react-native';
import type { MapViewProps } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';

export function MapViewConditional(props: MapViewProps) {  if (Platform.OS === 'web') {
    // En web, mostramos un placeholder
    return (
      <View 
        style={[
          props.style, 
          { 
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
          }
        ]}
      >
        <Text>Mapa no disponible en versión web</Text>
      </View>
    );
  }

  return <MapView {...props} />;
}

export { Marker };

