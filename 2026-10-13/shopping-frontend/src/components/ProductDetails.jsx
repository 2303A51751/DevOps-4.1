import { ArrowUpRight, X } from 'lucide-react';

export default function ProductDetails({ product, onClose, onEdit, onAddToCart }) {
  if (!product) return null;
  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="dialog details-dialog" role="dialog" aria-modal="true" aria-labelledby="details-title">
        <div className="details-top"><span className="eyebrow">PRODUCT / {String(product.id).padStart(3, '0')}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close details"><X size={19} /></button></div>
        <div className="details-art"><span>{product.category}</span><strong>{product.name}</strong><ArrowUpRight size={28} /></div>
        <div className="details-copy"><div><span className="eyebrow">CURRENT PRICE</span><h2 id="details-title">₹{Number(product.price).toLocaleString('en-IN')}</h2></div><p>{product.name} is listed in <strong>{product.category}</strong>. Product details are managed in your local catalog.</p></div>
        <div className="dialog-actions"><button className="button button-quiet" type="button" onClick={() => onEdit(product)}>Edit product</button><button className="button button-dark" type="button" onClick={() => onAddToCart(product)}>Add to cart</button></div>
      </section>
    </div>
  );
}