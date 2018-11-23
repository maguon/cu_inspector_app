import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    InteractionManager,
    Button
} from 'react-native'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-picker'

export default class CameraModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            operationModalVisible: false
        }
        this.takePhoto = this.takePhoto.bind(this)
        this.open = this.open.bind(this)
    }


    static defaultProps = {
        getImage: (param) => console.log('选择的图片信息', param), //回调图片信息
        _cameraStart: () => console.log('开始压缩选择的图片'),//开始压缩选择的图片
        openPhotoStore: () => console.log('打开图片仓库')
    }

    takePhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 960,
            maxHeight: 960,
            storageOptions: {
                skipBackup: true
            }
        }

        ImagePicker.launchCamera(options, (response) => {
            this.setState({
                operationModalVisible: false
            })
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                console.log('response', response)
                const source = { uri: response.uri }
            }
        })
    }

    open() {
        this.setState({ operationModalVisible: true })
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.operationModalVisible}
                    onRequestClose={() => this.setState({ operationModalVisible: false })}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalBlankSpace} onPress={() => this.setState({ operationModalVisible: false })} />
                        <View style={[styles.modalListSpace, { flexDirection: 'row', padding: 15 }]}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ operationModalVisible: false })
                                this.props.openPhotoStore()
  
                            }} style={{ margin: 7.5, width: 50, height: 50, borderColor: '#000', borderWidth: 0.3, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='ios-image' style={{ fontSize: 40, color: '#555' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.takePhoto} style={{ margin: 7.5, width: 50, height: 50, borderColor: '#000', borderWidth: 0.3, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='ios-camera' style={{ fontSize: 40, color: '#555' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    modalBlankSpace: {
        flex: 1,
        alignSelf: 'stretch'
    },
    modalListSpace: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
