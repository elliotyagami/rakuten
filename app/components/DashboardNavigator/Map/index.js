import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout, } from 'react-native-maps';
import translations from '../../../i18n'

export default class MyMap extends React.Component {
    constructor() {
        super()
        this.state = {
            markers: [],
            region: {
                latitude: 20.9948891,
                longitude: 105.799677,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            }
        };
    }
    static navigationOptions = {
        title: translations.t('map')
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            "markers": [
                {
                    latlng: {
                        latitude: 20.9948891,
                        longitude: 105.799677,
                    },
                    title: "hotel 1",
                    description: "best hotel"
                },
                {
                    latlng: {
                        latitude: 20.9848891,
                        longitude: 105.799677,
                    },
                    title: "hotel 1",
                    description: "best hotel"
                }
            ]
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={this.state.region}>
                    {this.state.markers.map((marker, i) => (
                        <Marker
                            key={i}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            >
                            <Callout tooltip={true}
                                            onPress={() => {
                                                this.props.navigation.navigate('AR', { channelId: "sample" })
                                            }}
                            />
                        </Marker>
                    ))}
                </MapView>
            </View >
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    map: {
        width: '100%',
        height: 300,
        flex: 1
    }
};
