// ProductList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Hot Wheels Store</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/customize/${product.id}`}>
              {product.name} - ${product.price.toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
