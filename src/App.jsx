import React, { Component } from 'react';
import css from './App.module.css';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  onDelete = id => {
    const contacts = [...this.state.contacts];
    const personToFind = id;
    const newContacts = contacts.filter(({ id }) => id !== personToFind);
    this.setState({
      contacts: newContacts,
    });
  };
  submitCathcer = ({ name, number }) => {
    const contacts = [...this.state.contacts];
    const nameToAdd = name;
    const person = {
      name: `${name}`,
      id: `${nanoid()}`,
      number: `${number}`,
    };
    const addCheck = contacts.find(({ name }) => name.includes(nameToAdd));
    if (!addCheck) {
      contacts.push(person);
      this.setState({
        contacts: contacts,
      });
    } else {
      alert(`${nameToAdd} is already in contacts`);
    }
  };
  filteredNames() {
    const contacts = [...this.state.contacts];
    const filter = this.state.filter;
    const filtered = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }
  onFilter = e => {
    const nameIs = e.target.value;
    this.setState({ filter: nameIs });
  };

  render() {
    return (
      <div className={css.App}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.submitCathcer} />

        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <Contacts contacts={this.filteredNames()} onDelete={this.onDelete} />
      </div>
    );
  }
}
export default App;
