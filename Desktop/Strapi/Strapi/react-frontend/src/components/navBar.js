import React, { useEffect, useState } from 'react';
import './navBar.css';

function NavBar() {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/navbar?populate=*');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const { data } = await response.json();
        

        // Vérifiez si les données ont la structure attendue
        if (data && data.attributes && data.attributes.content) {
          setNavItems(data.attributes.content);
        } else {
          console.warn("Les données reçues ne contiennent pas la propriété 'content'");
          setNavItems([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {navItems && navItems.length > 0 ? (
        <ul className="links_box">
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <a className='link' href={navItem.slug}>
                {navItem.name}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default NavBar;
