import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

export default class ConteudoFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Video
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            paused: false,
            skin: 'custom',
            ignoreSilentSwitch: null,
            isBuffering: false,
            imageHeight: 0,
        }

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);

    }

    onLoad(data) {
        this.setState({
            duration: data.duration,
            paused: true
        });
    }

    onProgress(data) {
        this.setState({ currentTime: data.currentTime });
    }

    onBuffer({ isBuffering } = { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }

    async componentDidMount(){
        this.onLoad.call();
    }

    render() {
        if (this.props.type == 'image') {
            return (
                <View>
                    <ImageBackground source={{ uri: this.props.source.uri }}
                        style={{
                            width: '100%',
                            height: 470,
                        }}
                    />
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => this.setState({ paused: !this.state.paused })}
                activeOpacity={0.85}
            >
                <Video
                    source={{ uri: this.props.source.uri }}
                    style={{
                        width: '100%',
                        height: 470,
                    }}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                    resizeMode={'cover'}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    onEnd={() => null}
                    repeat={true}
                />
            </TouchableOpacity>
        );
    }
}
