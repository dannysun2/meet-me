import React, { Component } from 'react';

const Button = (props) => {
    function _handleBtn(){
        props._handleClick()
    }
    
    return (<input type="button" value="Find Food" onClick={_handleBtn}/>);
}

export default Button;