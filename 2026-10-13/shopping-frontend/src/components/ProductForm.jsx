import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const blankProduct = { name: '', category: '', price: '' };

export default function ProductForm({ product, onSave, onClose, saving }) {
  const [form, setForm] = useState(blankProduct);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(product ? { name: product.name, category: product.category, price: String(product.price) } : blankProduct);
    setError('');
  }, [product]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim() || !form.category.trim() || form.price === '' || !Number.isFinite(price) || price < 0) {
      setError('Enter a name, category, and a valid non-negative price.');
      return;
    }
    try {
      await onSave({ name: form.name.trim(), category: form.category.trim(), price });
    } catch (saveError) {
      setError(saveError.message || 'Could not save this product. Please try again.');
    }
  }

  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="dialog form-dialog" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="dialog-heading">
          <div><span className="eyebrow">CATALOG ENTRY</span><h2 id="form-title">{product ? 'Edit product' : 'Add a product'}</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close form"><X size={19} /></button>
        </div>
        <form onSubmit={submit}>
          <label className="form-field">Product name<input name="name" value={form.name} onChange={updateField} placeholder="e.g. Studio headphones" autoFocus /></label>
          <label className="form-field">Category<input name="category" value={form.category} onChange={updateField} placeholder="e.g. Electronics" list="category-options" /></label>
          <datalist id="category-options"><option value="Electronics" /><option value="Accessories" /><option value="Home" /><option value="Clothing" /></datalist>
          <label className="form-field">Price <span className="currency-hint">INR</span><div className="form-price"><span>₹</span><input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} placeholder="0.00" /></div></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="dialog-actions"><button className="button button-quiet" type="button" onClick={onClose}>Cancel</button><button className="button button-dark" type="submit" disabled={saving}>{saving ? 'Saving...' : product ? 'Save changes' : 'Add product'}</button></div>
        </form>
      </section>
    </div>
  );
}