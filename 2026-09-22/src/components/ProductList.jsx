import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The edit</p>
          <h2 id="products-heading">Shop all products</h2>
        </div>
        <span className="product-count">{products.length} items</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
