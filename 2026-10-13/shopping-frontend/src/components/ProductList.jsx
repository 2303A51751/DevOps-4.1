import { PackageSearch } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, loading, error, onRetry, onEdit, onDelete, onDetails, onAddToCart, onAddProduct }) {
  if (loading) return <div className="state-panel" role="status"><span className="loader" />Loading products...</div>;

  if (error) {
    return (
      <div className="state-panel error-state" role="alert">
        <p>Unable to load products. Please try again.</p>
        <button className="button button-dark" type="button" onClick={onRetry}>Try again</button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="state-panel empty-state">
        <PackageSearch size={27} strokeWidth={1.5} />
        <strong>No products found</strong>
        <span>Try adjusting your filters or add a new product.</span>
        <button className="text-button" type="button" onClick={onAddProduct}>Add a product <span aria-hidden="true">↗</span></button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} onEdit={onEdit} onDelete={onDelete} onDetails={onDetails} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}