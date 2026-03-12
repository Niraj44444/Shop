import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product ")); // Keeping the space!

        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data() 
        }));

        console.log("Fetched products:", productsArray); 
        setProducts(productsArray); 
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found in the database.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Available Products</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>

            {/* ✅ NEW: THE IMAGE TAG */}
            {/* We check if the product HAS a coverImageURL before trying to render it */}
            {product.coverImageURL && (
              <img 
                src={product.coverImageURL} 
                alt={product.title} 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover', // This prevents the image from looking squished
                  borderRadius: '4px',
                  marginBottom: '10px'
                }} 
              />
            )}

            <h3 style={{ marginTop: '0' }}>{product.title}</h3>
            <p style={{ color: 'green', fontWeight: 'bold' }}>Price: ${product.price}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p style={{ fontSize: '14px', color: '#555' }}>{product.description}</p>

            <p style={{ fontSize: '12px', fontWeight: 'bold', color: product.isAvailable ? 'green' : 'red' }}>
              {product.isAvailable ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}