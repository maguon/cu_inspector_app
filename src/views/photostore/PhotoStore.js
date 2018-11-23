import React, { Component } from 'react'
import {
    Dimensions,
    Button,
    FlatList,
    ImageBackground,
    View,
    CameraRoll,
    InteractionManager
} from 'react-native'
import { CheckBox } from 'native-base'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'

const imageMinSize = 80
const { width, height } = Dimensions.get('window')
const imageMarginSize = 1
const listItemCount = Math.floor(width / (imageMinSize + imageMarginSize * 2))
const itemSize = (width - imageMarginSize * 2 * listItemCount) / listItemCount
const checkListMaxCount = 9

class ImageListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        const { item, check } = this.props
        return (
            <View style={{ backgroundColor: '#f4f4f4', width: itemSize, height: itemSize, margin: imageMarginSize }}>
                <ImageBackground source={{ uri: item.node.image.uri }} style={{ width: itemSize, height: itemSize }}>
                    <CheckBox
                        checked={this.state.active}
                        onPress={() => {

                            this.setState({ active: !this.state.active })
                            check(item.node.image.uri, !this.state.active)
                        }}
                        color="#3ad626"
                        style={{
                            borderBottomWidth: 1,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            alignSelf: 'flex-end',
                            marginTop: 5,
                            marginRight: 15,
                            paddingRight: 0,
                            borderColor: this.state.active ? '#3ad626' : '#fff'
                        }} />
                </ImageBackground>
            </View>
        )
    }
}



const PhotoStore = props => {
    console.log('photoStoreReducer', props)
    const { photoStoreReducer: { data: { imageList, isComplete }, getPhotoStore } ,getPhotesMore} = props
    return (
        <View style={{ backgroundColor: '#141414', flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={true}
                onEndReachedThreshold={0.3}
                keyExtractor={(item, index) => index}
                numColumns={listItemCount}
                data={imageList}
                onEndReached={() => {
                    if (getPhotoStore.isResultStatus == 2 && !isComplete) {
                        getPhotesMore()
                    }
                }}
                renderItem={({ item }) => <ImageListItem item={item} check={() => { }} />} />
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
        photoStoreReducer: state.photoStoreReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPhotesMore: () => {
        dispatch(reduxActions.photostore.getPhotesMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoStore)
