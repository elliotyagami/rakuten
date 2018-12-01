import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
export default class RepoList extends Component {
    constructor() {
        super()
        this.renderItem = ({ item }) => (
            <Card
                title={item.title}
                image={{ uri: item.avatar }}>
                <Text style={{ marginBottom: 10 }}>
                    {item.description}
                </Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Maps', { name: item.title })
                    }}
                    icon={<Icon name='code' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='Explore' />
            </Card>
        );


    }
    static navigationOptions = {
        title: 'Find places'
    }
    render() {
        const repos = [
            {
                title: 'Hotel',
                avatar: 'http://206.189.179.184:8000/hotel.jpg'
            },
            {
                title: 'Restaurants',
                avatar: 'http://206.189.179.184:8000/restaurant.jpg'
            },
            {
                title: 'Shopping mall',
                avatar: 'http://206.189.179.184:8000/shopping.jpg'
            }
        ]
        return (
            <FlatList
                data={repos}
                renderItem={this.renderItem}
            />
        );
    }
}

