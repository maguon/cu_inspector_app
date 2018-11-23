import React from 'react'
import { Text,TouchableOpacity } from 'react-native'


const PhotoStoreToolButton = props => {
    return (
        <TouchableOpacity onPress={()=>{}}>
            <Text style={{color:'#3ad626'}}>(0/9)发送</Text>
        </TouchableOpacity>
    )
}

export default PhotoStoreToolButton