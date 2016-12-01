import React, { Component } from 'react';

const Button = (props) => {
    function _handleBtn(){
        props._handleClick()
    }
    
    return (<input className="btn btn-block btn-lg btn-theme-2" type="button" value="Find Food" onClick={_handleBtn}/>);
}

export default Button;