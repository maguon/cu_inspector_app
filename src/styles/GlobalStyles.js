import {
    StyleSheet
} from 'react-native'
import { fontSizeCoeff } from '../utils'

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    },
    styleColor: {
        color: '#024896'
    },
    styleBackgroundColor: {
        backgroundColor: '#024896'     
    },
    textColor:{
        color: '#777'
    },
    midText: {
        fontSize: 14 * fontSizeCoeff,
        color: '#777'
    },
    midTextNoColor: {
        fontSize: 14 * fontSizeCoeff
    },
    smallText: {
        fontSize: 12 * fontSizeCoeff,
        color: '#777'
    },
    ssText: {
        fontSize: 10 * fontSizeCoeff,
        color: '#777'
    },
    largeText:{
        fontSize: 16 * fontSizeCoeff,
        color: '#777'
    },
    xlText:{
        fontSize: 18 * fontSizeCoeff,
        color: '#777'
    },
    xxlText:{
        fontSize: 20 * fontSizeCoeff,
        color: '#777'
    },
    xxxlText:{
        fontSize: 30 * fontSizeCoeff,
        color: '#777'
    },
    formIcon:{
        marginLeft: 10,
        fontSize:20,
        color: '#777'
    },
    listContainer: {
        backgroundColor: '#eee',
        padding: 5
    },
    listItem:{
        backgroundColor: '#fff',
        margin: 5
    },
    errorText:{
        fontSize: 12 * fontSizeCoeff,
        color: 'red'
    },
    separator:{
        height:20
    }
})

export const styleColor='#024896'

export default globalStyles