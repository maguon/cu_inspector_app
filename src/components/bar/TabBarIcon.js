import React, { PropTypes, } from 'react'
import { Icon, Button } from 'native-base'
import { styleColor } from '../../styles/GlobalStyles'

const propTypes = {
  selected: PropTypes.bool,
  online: PropTypes.string,
  outline: PropTypes.string
};

const TabIcon = (props) => {
  return (
    <Icon name={props.online} style={{ color: props.selected ? styleColor : '#999' }} />
  )
}

TabIcon.propTypes = propTypes

export default TabIcon
