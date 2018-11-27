import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Dimensions, TouchableHighlight, ToastAndroid, Modal } from 'react-native'
import { Container, Content, Separator, Button, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../styles/GlobalStyles'
import moment from 'moment'
import { Geolocation } from "react-native-amap-geolocation"
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageViewer from 'react-native-image-zoom-viewer'


const pushImageMAXCount = 5
const imageMinSize = 60
const { width, height } = Dimensions.get('window')
const imageMarginSize = 7.5
const listItemCount = Math.floor((width - imageMarginSize * 2) / (imageMinSize + imageMarginSize * 2))
const itemSize = (width - imageMarginSize * 2 * (listItemCount + 1)) / listItemCount


class PeccancyCommit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageState: false,
            imageBrowserState: false,
            imageBrowserIndex: 0
        }
        this.getLocation = this.getLocation.bind(this)
        this.takePhoto = this.takePhoto.bind(this)
    }

    componentWillMount() {
        this.getLocation()
    }

    takePhoto() {
        if (this.state.imageState) {
            this.setState({ imageState: false })
        }
        const { pushLocalPeccancyImage, peccancyCommitReducer: { data: { imageInfoList } } } = this.props
        if (imageInfoList.length < pushImageMAXCount) {
            const options = {
                quality: 1.0,
                maxWidth: 960,
                maxHeight: 960,
                storageOptions: {
                    skipBackup: true
                }
            }

            ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel) {
                }
                else if (response.error) {
                }
                else {
                    pushLocalPeccancyImage({ takePhotoRes: response })
                }
            })
        } else {
            ToastAndroid.show(`违章照片数量最多${pushImageMAXCount}张！`, 10)
        }
    }

    componentWillUnmount() {
        this.props.cleanLocalPeccancyImage()
    }

    async getLocation() {
        try {
            if (this.state.imageState) {
                this.setState({ imageState: false })
            }
            this.props.getAddressByCoordinateWaiting()
            await Geolocation.init({
                ios: "64b45e5a6a67b8f4afcd867e00aebc1e",
                android: "64b45e5a6a67b8f4afcd867e00aebc1e"
            })
            Geolocation.setOptions({
                interval: 100,
                reGeocode: false
            })
            Geolocation.addLocationListener(location => {
                Geolocation.stop()
                this.props.getAddressByCoordinate({
                    coordinate: { longitude: location.longitude, latitude: location.latitude },
                    key: '22d16ea40b6fdb3ebc3daa1b48db3287'
                })
            })
            Geolocation.start()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { QrCodeInfo: { phone = '', vin = '', engine_num = '', license_plate = '' }, QrCodeInfo,
            peccancyCommitReducer: { data: { address: { formatted_address = '' }, address, imageInfoList, imagePushCount, imagePushIndex }, getAddressByCoordinate },
            commitPeccancy, previousViewName, peccancyCommitReducer } = this.props
        // console.log('imagePushIndex', imagePushIndex)
        // console.log('imagePushCount', imagePushCount)
        // console.log('peccancyCommitReducer', peccancyCommitReducer)
        const renderImageList = imageInfoList.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={{ padding: imageMarginSize }}
                    onPress={() => {
                        this.setState({ imageBrowserState: true, imageBrowserIndex: index })
                    }}
                    onLongPress={() => {
                        if (!this.state.imageState) {
                            this.setState({ imageState: true })
                        }
                    }}>
                    <Image source={{ uri: item.uri }}
                        style={[{ width: itemSize, height: itemSize },
                        this.state.imageState ? { borderColor: 'red', borderWidth: 1 } : {}]} />
                    {this.state.imageState && <TouchableOpacity onPress={() => this.props.delLocalPeccancyImage(item)}
                        style={[{
                            position: 'absolute', top: 0, right: 5, justifyContent: 'center', alignItems: 'center',
                            backgroundColor: 'red', width: 20, height: 20, borderRadius: 10
                        }]}>
                        <Icon name='ios-close' style={{ color: '#fff', fontSize: 20 }} />
                    </TouchableOpacity>}
                </TouchableOpacity>
            )
        })
        return (
            <TouchableHighlight style={[globalStyles.container, { flex: 1 }]} underlayColor={'#eee'} onPress={() => {
                if (this.state.imageState) {
                    this.setState({ imageState: false })
                }
            }}>
                <Content>
                    <View style={{ padding: 15 }}>
                        <Text>扫描日期：{moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                        <View style={{ flex: 1, marginVertical: 15 }}>
                            <Icon name='ios-pin' style={{ fontSize: 18, color: '#f4af43' }} />
                        </View>
                        <View style={{ flex: 10, marginVertical: 15 }}>
                            <Text style={[globalStyles.midText]}>{formatted_address}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {getAddressByCoordinate.isResultStatus == 1 && <ActivityIndicator size="small" color="#777" />}
                            {getAddressByCoordinate.isResultStatus != 1 && <TouchableOpacity onPress={this.getLocation}>
                                <Icon name='ios-locate' style={{ fontSize: 25, color: '#777' }} />
                            </TouchableOpacity>}
                        </View>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ paddingRight: 15, marginLeft: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginVertical: 15 }}>
                                <Icon name='ios-car' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                            </View>
                            <View style={{ flex: 11, marginVertical: 15 }}>
                                <Text style={[globalStyles.midText]}>{license_plate}</Text>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 15, paddingRight: 15, marginLeft: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                            <Text>车辆识别码：{vin}</Text>
                        </View>
                        <View style={{ padding: 15, backgroundColor: '#fff' }}>
                            <Text>发动机号：{engine_num}</Text>
                        </View>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 15 }}>
                        <View style={{ flex: 1, marginVertical: 15 }}>
                            <Icon name='ios-call' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                        </View>
                        <View style={{ flex: 11, marginVertical: 15 }}>
                            <Text style={[globalStyles.midText]}>{phone}</Text>
                        </View>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ padding: imageMarginSize, backgroundColor: '#fff', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <TouchableOpacity
                            onPress={this.takePhoto}
                            style={{ width: itemSize, height: itemSize, marginHorizontal: imageMarginSize, marginVertical: imageMarginSize, justifyContent: 'center', alignItems: 'center', borderColor: '#777', borderWidth: 0.5, borderRadius: 5 }}>
                            <Icon name='ios-camera' style={{ fontSize: 55, color: '#777' }} />
                        </TouchableOpacity>
                        {renderImageList}
                    </View>
                    <View style={{ margin: 7.5, flexDirection: 'row' }}>
                        <Button full
                            style={{ margin: 7.5, flex: 1, backgroundColor: getAddressByCoordinate.isResultStatus == 2 ? styleColor : '#ccc' }}
                            disabled={getAddressByCoordinate.isResultStatus != 2}
                            onPress={() => commitPeccancy({ address, QrCodeInfo, previousViewName ,type:'toInfo'})}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>提交后查看详情</Text>
                        </Button>
                        <Button full
                            style={{ margin: 7.5, flex: 1, backgroundColor: getAddressByCoordinate.isResultStatus == 2 ? styleColor : '#ccc' }}
                            disabled={getAddressByCoordinate.isResultStatus != 2}
                            onPress={() => commitPeccancy({ address, QrCodeInfo, previousViewName ,type:'toScan'})}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>提交后继续扫描</Text>
                        </Button>
                    </View>
                    <Modal visible={this.state.imageBrowserState}
                        transparent={false}
                        animationType={'fade'}
                        onRequestClose={() => this.setState({ imageBrowserState: false })}>
                        <ImageViewer
                            saveToLocalByLongPress={false}
                            index={this.state.imageBrowserIndex}
                            ref={ref => this.ImageViewer = ref}
                            imageUrls={imageInfoList.map(item => ({
                                url: item.uri
                            }))} />
                        <Button icon onPress={() => {
                            const currentShowIndex = this.ImageViewer.state.currentShowIndex
                            const imgLength = imageInfoList.length
                            this.props.delLocalPeccancyImage(imageInfoList[currentShowIndex])
                            if (currentShowIndex > 0) {
                                this.setState({ imageBrowserIndex: currentShowIndex - 1 })
                            } else if (currentShowIndex == 0) {
                                if (imgLength > 1) {
                                    this.setState({ imageBrowserIndex: currentShowIndex })
                                } else if (imgLength == 1) {
                                    this.setState({ imageBrowserState: false })
                                }
                            }
                        }} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#414141' }}>
                            <Icon name='ios-trash' />
                        </Button>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={peccancyCommitReducer.commitPeccancy.isResultStatus == 1}
                        onRequestClose={() => {
                            alert("Modal has been closed.");
                        }}
                    >
                        <Container style={{ backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 5 }}>
                                <Spinner color={'#fff'} />
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>{`正在上传图片：${imagePushIndex + 1}/${imagePushCount}`}</Text>
                            </View>
                        </Container>
                    </Modal>

                </Content>
            </TouchableHighlight>
        )
    }
}//


const mapStateToProps = (state) => {
    return {
        peccancyCommitReducer: state.peccancyCommitReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAddressByCoordinate: param => {
        dispatch(reduxActions.peccancyCommit.getAddressByCoordinate(param))
    },
    getAddressByCoordinateWaiting: () => {
        dispatch(reduxActions.peccancyCommit.getAddressByCoordinateWaiting())
    },
    commitPeccancy: param => {
        dispatch(reduxActions.peccancyCommit.commitPeccancy(param))
    },
    pushLocalPeccancyImage: param => {
        dispatch(reduxActions.peccancyCommit.pushLocalPeccancyImage(param))
    },
    delLocalPeccancyImage: param => {
        dispatch(reduxActions.peccancyCommit.delLocalPeccancyImage(param))
    },
    cleanLocalPeccancyImage: () => {
        dispatch(reduxActions.peccancyCommit.cleanLocalPeccancyImage())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(PeccancyCommit)