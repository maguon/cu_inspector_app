
import React, { Component } from 'react'
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    Animated,
    View
} from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'

const previewWidth = 240
const previewHeight = 240
const window = Dimensions.get('window')

class Scan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstLoad: true,
            top: new Animated.Value(0),
            isSigned: false
        }
        this.onBarCodeRead = this.onBarCodeRead.bind(this)
    }

    onBarCodeRead(e) {
        const { scanReducer: { getQrCode } } = this.props
        if (getQrCode.isResultStatus != 1 && getQrCode.isResultStatus != 2) {
            // console.log(e)
            // console.log(
            //     "Barcode Found!",
            //     "Type: " + e.type + "\nData: " + e.data
            // );
            this.props.getQrCode(e.data)
        }

    }

    componentDidMount() {
        /** 获取视频、现场首页信息 */
        if (this.state.firstLoad) {
            this.setState({ firstLoad: false })
        }
        /** 定时器触发动画 */
        const that = this
        this.interval =
            setInterval(() => {
                Animated.timing(that.state.top, {
                    toValue: 1,
                    duration: 5000
                }).start(() => this.setState({ top: new Animated.Value(0) }))
            }, 5100)
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill} />
                <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <View style={{ width: window.width, height: (window.height - previewHeight) / 2 - 100, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                    <View style={{ width: window.width, height: previewHeight, flexDirection: 'row' }}>
                        <View style={{ width: (window.width - previewWidth) / 2, height: previewHeight, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                        <View style={{ width: previewWidth, height: previewHeight }} >
                            <View style={{ position: 'absolute', left: 0, top: 0 }}>
                                <View style={{ height: 2, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 2, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', right: 1, top: -1, transform: [{ rotate: '90deg' }] }}>
                                <View style={{ height: 2, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 2, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', left: 1, bottom: -1, transform: [{ rotateZ: '-90deg' }] }}>
                                <View style={{ height: 2, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 2, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0, bottom: 0, transform: [{ rotateZ: '180deg' }] }}>
                                <View style={{ height: 2, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 2, backgroundColor: '#37b44a' }} />
                            </View>
                            <Animated.View style={{
                                width: previewWidth,
                                height: 1,
                                backgroundColor: '#37b44a',
                                transform: [{
                                    translateY: this.state.top.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, previewHeight]
                                    })
                                }]
                            }} />
                        </View>
                        <View style={{ width: (window.width - previewWidth) / 2, height: previewHeight, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                    </View>
                    <View style={{ width: window.width, height: (window.height - previewHeight) / 2 + 100, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                </View>
            </View>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        scanReducer: state.scanReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getQrCode: param => {
        const { navigation } = ownProps
        dispatch(reduxActions.scan.getQrCode(param, navigation))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',

    },
    preview: {
        flex: 1,

        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
