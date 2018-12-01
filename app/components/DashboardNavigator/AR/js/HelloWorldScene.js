'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  Viro3DObject
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/guadalupe_360.jpg')} />
        <Viro3DObject
    source={require("./shoe/shoe.obj")}
    resources={[require('./shoe/shoe.mtl'),
                require('./shoe/13303-normal.jpg'),
                require('./shoe/as.jpg'),
                require('./shoe/zz.jpg'),
                require('./shoe/knitting.jpg'),
                require('./shoe/vans-lxvi-lookbook-inscribe.jpg'),
                require('./shoe/5233243436_4818c1bcac.jpg'),
                require('./shoe/black_fabric_texture_soft_cloth_suede_fuzzy_stock_by_texturex_com-d65y924.jpg'),
                require('./shoe/f6a38187844d0de663ddee4b424287aa.jpg'),
                 require('./shoe/4527556-old-lace-background-set-of-4-seamless-pattern-vector-texture.jpg')]}
    highAccuracyEvents={true}
    position={[0, 0, -2]}
    scale={[2, 2, 2]}
    rotation={[45, 0, 0]}
    type="OBJ"
    transformBehaviors={["billboard"]}/>
      </ViroScene>
    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldScene;
