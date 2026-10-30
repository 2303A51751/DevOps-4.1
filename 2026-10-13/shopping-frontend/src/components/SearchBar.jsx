import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function SearchBar({
  query, onQueryChange, category, onCategoryChange, categories,
  minPrice, onMinPriceChange, maxPrice, onMaxPriceChange,
  sort, onSortChange, onClear,
}) {
  return (
    <section className="filter-panel" aria-label="Product filters">
      <label className="search-field">
        <Search size={18} aria-hidden="true" />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search products or categories" aria-label="Search products" />
        {query && <button className="clear-search" type="button" onClick={() => onQueryChange('')} aria-label="Clear search"><X size={15} /></button>}
      </label>
      <div className="filter-controls">
        <label className="select-control">
          <span className="sr-only">Category</span>
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="price-control">
          <span className="sr-only">Minimum price</span>
          <span>₹</span><input type="number" min="0" value={minPrice} onChange={(event) => onMinPriceChange(event.target.value)} placeholder="Min" />
        </label>
        <span className="price-dash">to</span>
        <label className="price-control">
          <span className="sr-only">Maximum price</span>
          <span>₹</span><input type="number" min="0" value={maxPrice} onChange={(event) => onMaxPriceChange(event.target.value)} placeholder="Max" />
        </label>
        <label className="select-control sort-control">
          <SlidersHorizontal size={15} aria-hidden="true" />
          <span className="sr-only">Sort products</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
            <option value="newest">Newest first</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <button className="text-button clear-filters" type="button" onClick={onClear}>Reset</button>
      </div>
    </section>
  );
}