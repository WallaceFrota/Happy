import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE, } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface NursingHomeItem {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function NursingHomesMap() {
    const [nursingHomes, setNursingHomes] = useState<NursingHomeItem[]>([])
    
    const {navigate} = useNavigation();

    useFocusEffect(() => {
      api.get('/nursinghomes').then(response => {
        setNursingHomes(response.data)
      });
    })

    // navega para as informações da casa de apoio de acordo com a que foi selecionada no mapa, repassando o id
    function handleNavigateToNursingHomesDetails(id: number) {
      navigate('NursingHomesDetails', {id})
    }
    
    // tela para iniciar cadastro de lar de idosos
    function handleNavigateCreateNursingHomes() {
      navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: -1.2808948,
                  longitude: -47.9515193,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
                }}
            >
            {nursingHomes.map(nursinghome => (
                  <Marker
                      key={nursinghome.id}
                      icon={mapMarker}
                      calloutAnchor={{
                        x: 2.7,
                        y: 0.8
                      }}
                      coordinate={{
                        latitude: nursinghome.latitude,
                        longitude: nursinghome.longitude,
                      }}
                  >
                  <Callout tooltip onPress={() => handleNavigateToNursingHomesDetails(nursinghome.id)}>
                    <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{nursinghome.name}</Text>
                    </View>
                  </Callout>
                </Marker>
            ))}

          </MapView>
        <View style={styles.containerFooter}>
            <Text style={styles.footerText}>{nursingHomes.length} orfanatos encontrados</Text>

            <RectButton style={styles.createSeniorHomeButton} onPress={handleNavigateCreateNursingHomes}>
              <Feather name="plus" size={32} color="#fff"/>
            </RectButton>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative'
    },
    map: {
      width: Dimensions.get('window').width,
      height: '100%',
    },
    calloutContainer: {
      width: 160,
      height: 46,
      backgroundColor: 'white',
      borderRadius: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#F0F0F5',
      justifyContent: "center",
    },
    calloutText: {
      fontSize: 14,
      color: "#0089a5",
      fontFamily: 'Nunito_700Bold'
    },
    containerFooter: {
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 32,
      
      backgroundColor: "#fff",
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
    footerText: {
      color: "#545454",
      fontFamily: 'Nunito_700Bold'
    },
    createSeniorHomeButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      
      justifyContent: 'center',
      alignItems: 'center',
    }
  });