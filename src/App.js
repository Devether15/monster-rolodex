import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component { //instead of the previous function, we can accees state when using classes
  constructor() { //
    super(); //calls the constructor method on the component class, it give us access to this.state

    this.state = {
      monsters: [],
      searchField: ''  //we just need an empty array now, and we are going to populate it when the componentDidMount kicks in  
    };

    //this.handleChange = this.handleChange.bind(this); //this is necesary if we don't use arrow functions, becaise we need to set the context
  }

  //componentDidMount() is a life cicle method, we are accesing it because of our class component.
  componentDidMount(){ //this method comes in the React.components, as well as lots of other built in methods
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()) //we are parsing it to a json format
      .then(users => this.setState({ monsters: users }))//we're takig the users that got back from the previous promise, and set our monsters to that array of user
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render() {
    const { monsters, searchField} = this.state;
    // const monsters = this.state.monsters;     this is the equivalent using normal js instead of destructuring
    // const searchField = this.state.searchField;

    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
    ) 

    return (
      <div className="App">
       <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder = 'search monsters'
          handleChange = { this.handleChange }
        />
        <CardList monsters={filteredMonsters}/>      
      </div>
    );
  }
}

export default App;

//state is a object with properties that we can accesss at any point inside of our class

//state is updated by setState(), and the react tells the dom to re-render, the data flow only in one direction.
