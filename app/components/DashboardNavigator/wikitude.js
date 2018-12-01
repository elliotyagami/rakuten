/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Wikitude from 'react-native-wikitude';

type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super()
    this.onButtonPress = () => {
      Wikitude.startAR('http://206.189.179.184:8000/08_PointOfInterest_4_SelectingPois/', true, true, true, "phUhb356ngDHJqb4IvI4l8YVOrTkDKp9LG8abwtQQiHrVhJo5oBv2doj2990jOUYyFXmLeQ9izziLfiU9ePC8y8t6Ds8WwVd8dscSfTqP7XbLKOfUMb+P0MrwTWeR3v1wOcOp5KmYfOvIwZkEXhwbMP4clhgOa7hEcKk4vE5imRTYWx0ZWRfX7mH8TWliPY4viSBB2VtQHKvvsOz7nhfc2+lxsO7++zkIekTcltrow1vIna3q2EldiqjzVAlHXOltQsbmFEDnHblj5l2RcdozpxhYYDlNAGQl6S9zJrzvbJwdfqK5sbebv2rb8BlSPiAJu2CcMYu/+CJv7il5UY+piaC4e9L5r8w2rYvL52le2bH8lPE67uU+kXU8jQZgwZUpJnp+4Jp1sRS4QKPYi6ze3+EUwRfhlKOSaiY6Dv5MXlaN5rkx5IZQsW9VtpTaYKSoxnPrLe5KaSk5jz3q0+PmApLbmiCkI+bGl0ZmRx0C+SCz8qRU383OXlHXGtBE4ClasNupx3IOPErXmX/gxS6GvlWtEYo7tApKO3yPZ8gThW2jSpOZU4S6p87n0UjqpntBDyMv0/AkPvsw7+7sqlKmR8O4+REKRaxBNUiRVrFrh4LOierOtBrXwXTqyFIQiOZ4Aqc0+64h4/BkM+sQy0f0t3376vok6D38uv9wqKi+Ae5eLp6sU9bhDt7gjiE7/Mzs4utK63fYxtVDM75+q4lWw==")
  };
}
render() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={this.onButtonPress}
    >
    <Text style={styles.welcome}>Welcome to React Native!</Text>
</TouchableOpacity>
      </View >
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
