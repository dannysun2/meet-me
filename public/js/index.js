import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'axios';
import List from './components/List';
import Button from './components/Button';
import Map from './components/Map'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            places: [],
            location1: '',
            location2: ''
        }
    }

    _handleClick() {
        var url = `/${this.state.location1}/${this.state.location2}`
        request.get(url)
            .then(response => {
                var newPlaces = []
                newPlaces.push(response.data.businesses)
                this.setState({
                    places: response.data.businesses
                })
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
        const location = {
            lat: 29.7204793,
            lng: -95.3782515
        }

        return (
        <div>
            <div className='map-wrapper'>
            
                <div className="map-canvas2">
                    <Map center={location}/>
                </div>

        <div className="over home-form-col col-sm-6 col-md-5 col-lg-4"> 
            <div className="panel panel-theme-2 wow fadeInUp">
                <div className="panel-heading"><h5>Please Enter Addresses</h5></div>

            <div className="panel-body">
                <fieldset className="row">
                    <div className="form-group col-sm-12">
                    <label for="firstLocation">First Location</label>
                        <input className="form-control" type="text" onChange={this._handleInput1.bind(this)} placeholder="Enter First Location" />
                    </div>

                    <div className="form-group col-xs-12">
                        <label for="secondLocation">Second Location</label>
                        <input className="form-control" type="text" onChange={this._handleInput2.bind(this)} placeholder="Enter Second Location"/>
                    </div>

                    <div className="form-group col-xs-12">
                        <Button _handleClick={this._handleClick.bind(this)}/>
                    </div>

                </fieldset>
            </div>
        </div>
        </div>

            </div>

                <List places={this.state.places}/>

        </div>)
    }

}

ReactDOM.render(<App/>, document.querySelector('.container-fluid'))