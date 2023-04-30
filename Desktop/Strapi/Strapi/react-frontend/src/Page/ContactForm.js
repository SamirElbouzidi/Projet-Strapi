import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const AUTH_TOKEN =
    "c97374011a24ed3021de174781e640e3985975bacdc6843d730a9445934e8cf529c96221c238c1202183213ce8419fd6ce08df88233f18f4cc5d6d7f611885a03a07be4498a2ed209867f8eccd643d8e88675a956d512a5987a82d773e5321913804cb378972b52e81aa4f11fa89dc69c3e3e6961a71022e814fc69180aef90b";

  useEffect(() => {
    fetchContacts();
    fetchRestaurants();
  }, []);

  const fetchContacts = () => {
    axios
      .get("http://localhost:1337/api/contacts?populate=*", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setContacts([]);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setContacts([]);
      });
  };

  const fetchRestaurants = () => {
    axios
      .get("http://localhost:1337/api/restaurants", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          setRestaurants([]);
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setRestaurants([]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      data: {
        firstName: firstName,
        lastName: lastName,
        Email: email,
        restaurant: {
          id: selectedRestaurant,
        },
      },
    };

    console.log("Submitting new contact:", newContact);

    axios
      .post("http://localhost:1337/api/contacts?populate=*", newContact, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      })
      .then((response) => {
        console.log("API response status:", response.status);
        console.log("API response headers:", response.headers);
        fetchContacts();
        alert("La réservation a bien été effectuée!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <div>
      <h1>Liste des réservation</h1>
      {contacts.length === 0 ? (
        <p>Aucun contact trouvé.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
            {contact.attributes.lastName}, {contact.attributes.firstName}
            </li>
          ))}
        </ul>
      )}
        <br />
      <h2>Faites votre réservation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom :
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Nom :
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email :
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Restaurant :
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="">Sélectionnez un restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.attributes.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Ajouter</button>
        </form>
      </div>
      );
    };
    
    export default ContactForm;
