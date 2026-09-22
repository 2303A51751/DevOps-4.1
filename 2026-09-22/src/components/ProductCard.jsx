function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-card-body">
        <div>
          <h3>{product.name}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
        </div>
        <button type="button" className="add-button" onClick={() => onAddToCart(product)}>
          Add to Cart
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
