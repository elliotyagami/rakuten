/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal
} from 'react-native';

const { width } = Dimensions.get('window');

import { RtcEngine, AgoraView } from 'react-native-agora'

export default class RNAgoraExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remotes: [],
            isJoinSuccess: false,
            isSpeaker: true,
            isMute: false,
            isCameraTorch: false,
            disableVideo: true,
            isHideButtons: false,
            visible: false,
            selectUid: undefined
        };
        this.onCancel = (err) => { console.log("cancelled", err) }
        this.onPressChat = () => this.props.navigation.navigate('Chat', { name: this.props.navigation.state.params.channelId })
    }

    static navigationOptions = {
        title: 'VideoChat'
    }
    componentWillMount() {
        //初始化Agora
        const options = {
            appid: '324cbe8505a649bb9f157e6946fa832b',
            channelProfile: 1,
            videoProfile: 40,
            clientRole: 1,
            swapWidthAndHeight: true
        };
        RtcEngine.init(options);

    }

    componentDidMount() {

        RtcEngine.getSdkVersion((version) => {
            console.log(version)
        });
        RtcEngine.joinChannel(this.props.navigation.state.params.channelId, 1);

        // RtcEngine.enableAudioVolumeIndication(500,3);



        RtcEngine.eventEmitter({
            onFirstRemoteVideoDecoded: (data) => {
                console.log(data);
                const { remotes } = this.state;
                const newRemotes = [...remotes];

                if (!remotes.find(uid => uid === data.uid)) {
                    newRemotes.push(data.uid);
                }
                this.setState({ remotes: newRemotes });
            },
            onUserOffline: (data) => {
                console.log(data);
                const { remotes } = this.state;
                const newRemotes = remotes.filter(uid => uid !== data.uid);
                this.setState({ remotes: newRemotes });
            },
            onJoinChannelSuccess: (data) => {
                console.log(data);
                RtcEngine.startPreview();

                this.setState({
                    isJoinSuccess: true
                });
            },
            // onAudioVolumeIndication: (data) => {
            //     console.log(data, '-----');
            // },
            onUserJoined: (data) => {
                console.log(data);
            },
            onError: (data) => {
                console.log(data);

                if (data.err === 17) {
                    RtcEngine.leaveChannel();
                    RtcEngine.destroy();
                }

                this.onCancel(data.err)
            }
        })
    }

    componentWillUnmount() {
        RtcEngine.removeEmitter()
    }



    handlerCancel = () => {
        RtcEngine.leaveChannel();
        RtcEngine.destroy();

        this.onCancel("")
    };

    handlerSwitchCamera = () => {
        RtcEngine.switchCamera();
    };

    handlerMuteAllRemoteAudioStreams = () => {
        this.setState({
            isMute: !this.state.isMute
        }, () => {
            RtcEngine.muteAllRemoteAudioStreams(this.state.isMute);
        })
    };

    handlerSetEnableSpeakerphone = () => {
        this.setState({
            isSpeaker: !this.state.isSpeaker
        }, () => {
            RtcEngine.setDefaultAudioRouteToSpeakerphone(this.state.isSpeaker);
        });
    };

    handlerChangeCameraTorch = () => {
        this.setState({
            isCameraTorch: !this.state.isCameraTorch
        }, () => {
            RtcEngine.setCameraTorchOn(this.state.isCameraTorch);
        });
    };

    handlerChangeVideo = () => {
        this.setState({
            disableVideo: !this.state.disableVideo
        }, () => {
            this.state.disableVideo ? RtcEngine.enableVideo() : RtcEngine.disableVideo()
        })
    };

    handlerHideButtons = () => {
        this.setState({
            isHideButtons: !this.state.isHideButtons
        })
    };

    onPressVideo = (uid) => {
        this.setState({
            selectUid: uid
        }, () => {
            this.setState({
                visible: true
            })
        })
    };

    render() {
        const { isMute, isSpeaker, isCameraTorch, disableVideo, isHideButtons, remotes, isJoinSuccess, visible } = this.state;

        if (!isJoinSuccess) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Connecting to chat</Text>
                </View>
            )
        }

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.handlerHideButtons}
                style={styles.container}
            >
                <AgoraView style={styles.localView} showLocalVideo={true} />
                <View style={styles.absView}>
                    {!visible ?
                        <View style={styles.videoView}>
                            {remotes.map((v, k) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => this.onPressVideo(v)}
                                        key={k}
                                    >
                                        <AgoraView
                                            style={styles.remoteView}
                                            zOrderMediaOverlay={true}
                                            remoteUid={v}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : <View style={styles.videoView} />
                    }

                    {!isHideButtons &&
                        <View>
                            <OperateButton
                                style={{ alignSelf: 'center', marginBottom: -10 }}
                                onPress={this.handlerCancel}
                                imgStyle={{ width: 60, height: 60 }}
                                source={require('../images/btn_endcall.png')}
                            />
                            <View style={styles.bottomView}>
                                <OperateButton
                                    onPress={this.onPressChat}
                                    imgStyle={{ width: 40, height: 40 }}
                                    source={require('../images/chat.png')}
                                />
                                <OperateButton
                                    onPress={this.handlerChangeVideo}
                                    source={disableVideo ? require('../images/摄像头打开.png') : require('../images/摄像头关闭.png')}
                                />
                            </View>
                            <View style={styles.bottomView}>
                                <OperateButton
                                    onPress={this.handlerMuteAllRemoteAudioStreams}
                                    source={isMute ? require('../images/icon_muted.png') : require('../images/btn_mute.png')}
                                />
                                <OperateButton
                                    onPress={this.handlerSwitchCamera}
                                    source={require('../images/btn_switch_camera.png')}
                                />
                                <OperateButton
                                    onPress={this.handlerSetEnableSpeakerphone}
                                    source={!isSpeaker ? require('../images/icon_speaker.png') : require('../images/btn_speaker.png')}
                                />
                            </View>
                        </View>
                    }
                </View>

                <Modal
                    visible={visible}
                    presentationStyle={'fullScreen'}
                    animationType={'slide'}
                    onRequestClose={() => { }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ flex: 1 }}
                        onPress={() => this.setState({
                            visible: false
                        })}
                    >
                        <AgoraView
                            style={{ flex: 1 }}
                            zOrderMediaOverlay={true}
                            remoteUid={this.state.selectUid}
                        />
                    </TouchableOpacity>
                </Modal>
            </TouchableOpacity>
        );
    }
}

class OperateButton extends PureComponent {
    render() {

        const { onPress, source, style, imgStyle = { width: 50, height: 50 } } = this.props;

        return (
            <TouchableOpacity
                style={style}
                onPress={onPress}
                activeOpacity={.7}
            >
                <Image
                    style={imgStyle}
                    source={source}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    absView: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    videoView: {
        padding: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        zIndex: 100
    },
    localView: {
        flex: 1
    },
    remoteView: {
        width: (width - 40) / 3,
        height: (width - 40) / 3,
        margin: 5
    },
    bottomView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
