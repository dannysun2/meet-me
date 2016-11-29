import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'axios';
import List from './components/List';
import Button from './components/Button';
import Map from './components/Map';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            places: [],
            location1: '',
            location2: ''
        }
    }

    componentWillMount(){

    }

    _handleClick() {
        var url = `/${this.state.location1}/${this.state.location2}`
        request.get(url)
            .then(response => {
                console.log(response)
                var newPlaces = []
                newPlaces.push(response.data.businesses)
                this.setState({
                    places: response.data.businesses
                })
                console.log(this.state.places)
            }) 
            .catch(err => {
                console.log(err)
            })
    }

    _handleInput1(e) {
        this.setState({
            location1: e.target.value
        })
    }

    _handleInput2(e) {
        this.setState({
            location2: e.target.value
        })
    }

    render() {
        return (<div>
        <h1>Hello, World</h1>
        <List places={this.state.places}/>
        <input type="text" onChange={this._handleInput1.bind(this)} />
        <input type="text" onChange={this._handleInput2.bind(this)} />
        <Button _handleClick={this._handleClick.bind(this)}/>
        </div>)
    }

}

ReactDOM.render(<App/>, document.querySelector('.container'))