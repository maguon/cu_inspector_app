import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    Button,
    InteractionManager
} from 'react-native'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import CameraModal from '../../components/CameraModal'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'


class Photograph extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='1111' onPress={() => this.CameraModal.open()} />
                <CameraModal ref={ref => this.CameraModal = ref} openPhotoStore={() => {
                    Actions.photoStore()
                    InteractionManager.runAfterInteractions(this.props.getPhotos)
                }} />
            </View>
        );
    }

}


const mapDispatchToProps = (dispatch) => ({
    getPhotos: () => {
        dispatch(reduxActions.photostore.getPhotes())
    }
})

export default connect(null, mapDispatchToProps)(Photograph)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
