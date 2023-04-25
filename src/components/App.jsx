import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import s from './App.module.css'

export default class App extends Component {
state = {
  contacts: [  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
   filter: ''
}

    componentDidMount() {
    const contactsData = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contactsData )

    if(parsedContacts) { this.setState({contactsData : parsedContacts})}
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  

  formSubmitHandler = ({ name, number }) => {
    this.setState(({ contacts }) => {
    const isContact = contacts.find(contact => contact.name === name);

      if (isContact) {
        alert(`${name} is already in contact`);
        return contacts;
      } else {
        const newContact = {
        id: nanoid(),
        name,
        number,
      };
        return {
          contacts: [...contacts, newContact],
        };
      }
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

   getFiltredContacts = () => {
     const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getFiltredContacts();

    return (
    <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
         <ContactForm onSubmit={this.formSubmitHandler}/>

        <h2 className={s.title}>Contacts</h2>
         <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
</div>)
}
}
