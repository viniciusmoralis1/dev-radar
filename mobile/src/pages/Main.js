import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';    
import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }){
    const [currentRegion, setCurrentRegion] = useState(null); 
    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionAsync();
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
            }
            const { latitude, longitude } = coords;

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            })
        }
        loadInitialPosition();
    }, []);

    if(!currentRegion){
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: ,longitude: }}>
                <Image style={styles.avatar} source={{ uri: }} />
                <Callout onPress={() =>{
                    navigation.navigate('Profile', {github_username})
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}></Text>
                        <Text style={styles.devBio}></Text>
                        <Text style={styles.devTechs}></Text> 
                    </View>
                </Callout>
            
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 250
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#888',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
})

export default Main;