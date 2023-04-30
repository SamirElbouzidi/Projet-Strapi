import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DynamicPage = () => {
  const [page, setPage] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      const response = await fetch(`http://localhost:1337/api/pages?populate=*`);
      const data = await response.json();
      const pageData = data.data.find(p => p.attributes.slug === `/${slug}`);
      console.log("Page Data:", pageData);
      if (pageData) {
        setPage(pageData.attributes);
        setRestaurant(pageData.attributes.restaurant.data.attributes);
      }
    };
    fetchPage();
  }, [slug]);

  if (!page || !restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Le Restaurant : {page.name}</h1>
      <p>{restaurant.Description}</p>
      {/* Ajoutez ici le contenu HTML ou d'autres éléments pour afficher la page */}
    </div>
  );
};

export default DynamicPage;
