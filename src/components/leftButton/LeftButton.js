import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const LeftButton = props => {
    // console.log('props', props)
    return (
        <Button transparent onPress={() => Actions.popTo(props.previousViewName)}>
            <Icon name='arrow-back' />
        </Button>
    )
}

export default LeftButton