import React, { Component } from 'react';
import ListItem from './ListItem';

const List = (props) => {
  const places = props.places.map(place => {
    return (<ListItem key={place.id} place={place.name}/>)
  })

  return (<ul>
            {places}
          </ul>)
}

export default List;