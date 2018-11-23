import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, Modal,BackHandler } from 'react-native'
import { Container, Content, Separator, Button, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../styles/GlobalStyles'
import moment from 'moment'
import { connect } from 'react-redux'
import ImageViewer from 'react-native-image-zoom-viewer'
import * as reduxActions from '../../reduxActions'

import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'

const imageMinSize = 60
const { width, height } = Dimensions.get('window')
const imageMarginSize = 7.5
const listItemCount = Math.floor((width - imageMarginSize * 2) / (imageMinSize + imageMarginSize * 2))
const itemSize = (width - imageMarginSize * 2 * (listItemCount + 1)) / listItemCount

class PeccancyInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageBrowserState: false,
            imageBrowserIndex: 0
        }
    }

    componentDidMount() {
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //   //this.goBack(); // works best when the goBack is async
        //  console.log(11111)
        //   return true;
        // });
      }
    


    componentWillUnmount() {
        this.props.cleanPeccancyImageList()
        // this.backHandler.remove();
    }

    render() {
        const { peccancy: { license_plate = '', address = '', created_on, vin = '', engine_num = '', phone = '' },
            peccancyInfoReducer: { data: { imageList }, getPeccancyImageList } } = this.props
        // console.log('imageList', imageList)
        const renderImageList = imageList.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={{ padding: imageMarginSize }}
                    onPress={() => {
                        this.setState({ imageBrowserState: true, imageBrowserIndex: index })
                    }}>
                    <Image source={{ uri: item.uri }}
                        style={[{ width: itemSize, height: itemSize }]} />
                </TouchableOpacity>

            )
        })
        return (
            <Container style={globalStyles.container}>
                <Content>
                    < View style={{ padding: 15 }}>
                        <Text>扫描日期：{created_on ? moment(created_on).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </View>
                    < View style={{ padding: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon name='ios-pin' style={{ fontSize: 18, color: '#f4af43' }} />
                        <Text style={[globalStyles.midText, { marginLeft: 10 }]}>{address}</Text>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ paddingVertical: 15, paddingRight: 15, marginLeft: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                            <Icon name='ios-car' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                            <Text style={[globalStyles.midText, { marginLeft: 10 }]}>{license_plate}</Text>
                        </View>
                        <View style={{ paddingVertical: 15, paddingRight: 15, marginLeft: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                            <Text>车辆识别码：{vin}</Text>
                        </View>
                        <View style={{ padding: 15, backgroundColor: '#fff' }}>
                            <Text>发动机号：{engine_num}</Text>
                        </View>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={{ padding: 15, backgroundColor: '#fff', flexDirection: 'row', }}>
                        <Icon name='ios-call' style={[globalStyles.styleColor, { fontSize: 18 }]} />
                        <Text style={[globalStyles.midText, { marginLeft: 10 }]}>{phone}</Text>
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                    <View style={[{ padding: 7.5, backgroundColor: '#fff', flexDirection: 'row', flexWrap: 'wrap' }, getPeccancyImageList.isResultStatus == 1 ? { justifyContent: 'center' } : {}]}>
                        {getPeccancyImageList.isResultStatus != 1 && imageList.length > 0 && renderImageList}
                        {getPeccancyImageList.isResultStatus != 1 && imageList.length == 0 && <Text style={[globalStyles.midText, { padding: 7.5 }]}>暂无图片</Text>}
                        {getPeccancyImageList.isResultStatus == 1 && <Spinner size='small' color={styleColor} />}
                    </View>
                    <Separator style={[globalStyles.container, globalStyles.separator]} />
                </Content>
                <Modal visible={this.state.imageBrowserState}
                    transparent={false}
                    animationType={'fade'}
                    onRequestClose={() => this.setState({ imageBrowserState: false })}>
                    <ImageViewer
                        saveToLocalByLongPress={false}
                        index={this.state.imageBrowserIndex}
                        ref={ref => this.ImageViewer = ref}
                        imageUrls={imageList.map(item => ({
                            url: item.uri
                        }))} />
                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        peccancyInfoReducer: state.peccancyInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanPeccancyImageList: () => {
        dispatch(reduxActions.peccancyInfo.cleanPeccancyImageList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PeccancyInfo)