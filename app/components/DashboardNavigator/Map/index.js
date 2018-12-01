import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, } from 'react-native-maps';
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
                },
                {
                    latlng: {
                        latitude: 20.9848891,
                        longitude: 105.799677,
                    },

                }
            ]
        })
    }

    render() {
        let title = this.props.navigation.state.params.name;
        let details = [{
            title: "Suncity",
            description: "Agarwal builders"
        },
        {
            title: "JP House",
            description: "JP Builders"
        }]
        if ("ShoppingMall" == title) {
            details = [{ title: 'reliance store' }, { 'title': 'shoe store', description: 'Sandals, shoes, sneakers available for men and women' }]
        }
        return (
            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={this.state.region}>
                    {this.state.markers.map((marker, i) => (
                        <Marker
                            key={i}
                            coordinate={marker.latlng}
                            title={detaisl[i].title}
                            description={details[i].description}
                        >
                            <Callout tooltip={true}
                                onPress={() => {
                                    this.props.navigation.navigate('AR', { channelId: title })
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
