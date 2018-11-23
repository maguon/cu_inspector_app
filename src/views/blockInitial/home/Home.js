import React, { Component } from 'react'
import { Container } from 'native-base'
import HomeStatistics from './homeStatistics/HomeStatistics'
import PeccancyListForHome from './peccancyListForHome/PeccancyListForHome'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'

class Home extends Component {

    componentDidMount() {
        this.props.getHomeStatisticsWaiting()
        this.props.getPeccancyListForHomeWaiting()
        this.props.getHomeStatistics()
        this.props.getPeccancyListForHome()
    }


    render() {
        const { ...props } = this.props
        // console.log('this.props',this.props)
        return (
            <Container>
                <HomeStatistics {...props} />
                <PeccancyListForHome {...props} />
            </Container>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    getHomeStatistics: () => {
        dispatch(reduxActions.homeStatistics.getHomeStatistics())
    },
    getHomeStatisticsWaiting: () => {
        dispatch(reduxActions.homeStatistics.getHomeStatisticsWaiting())
    },
    getPeccancyListForHome: () => {
        dispatch(reduxActions.peccancyListForHome.getPeccancyListForHome())
    },
    getPeccancyListForHomeWaiting: () => {
        dispatch(reduxActions.peccancyListForHome.getPeccancyListForHomeWaiting())
    }
})

export default connect(null, mapDispatchToProps)(Home)