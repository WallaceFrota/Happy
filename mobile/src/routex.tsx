import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NursingHomesMap from './pages/NursingHomesMap';
import NursingHomesDetails from './pages/NursingHomesDetails';
import SelectMapPosition from './pages/CreateNursingHomes/SelectMapPosition';
import NursingHomesData from './pages/CreateNursingHomes/NursingHomesData';

import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: "#f5f5f5"}}}>
                <Screen 
                    name="NursingHomesMap"
                    component={NursingHomesMap}
                />
                <Screen 
                    name="NursingHomesDetails"
                    component={NursingHomesDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Lar"/>
                    }}
                />
                <Screen 
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa"/>
                    }}
                />
                <Screen 
                    name="NursingHomesData"
                    component={NursingHomesData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}