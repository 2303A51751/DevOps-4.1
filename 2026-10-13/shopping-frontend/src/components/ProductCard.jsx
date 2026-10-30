import { ArrowUpRight, Pencil, Plus, Trash2 } from 'lucide-react';

const palettes = ['mint', 'peach', 'blue', 'lemon'];

export default function ProductCard({ product, index, onEdit, onDelete, onDetails, onAddToCart }) {
  const palette = palettes[index % palettes.length];

  return (
    <article className="product-card">
      <button className={`product-art art-${palette}`} type="button" onClick={() => onDetails(product)} aria-label={`View ${product.name} details`}>
        <span className="art-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="art-category">{product.category}</span>
        <span className="art-name">{product.name}</span>
        <span className="art-open"><ArrowUpRight size={17} /></span>
        <span className="art-shape" aria-hidden="true" />
      </button>
      <div className="product-meta">
        <button className="product-title" type="button" onClick={() => onDetails(product)}>{product.name}</button>
        <span className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
      </div>
      <div className="product-bottom">
        <span className="category-label">{product.category}</span>
        <div className="card-actions">
          <button className="small-icon-button" type="button" onClick={() => onAddToCart(product)} aria-label={`Add ${product.name} to cart`} title="Add to cart"><Plus size={16} /></button>
          <button className="small-icon-button" type="button" onClick={() => onEdit(product)} aria-label={`Edit ${product.name}`} title="Edit product"><Pencil size={15} /></button>
          <button className="small-icon-button danger-action" type="button" onClick={() => onDelete(product)} aria-label={`Delete ${product.name}`} title="Delete product"><Trash2 size={15} /></button>
        </div>
      </div>
    </article>
  );
}