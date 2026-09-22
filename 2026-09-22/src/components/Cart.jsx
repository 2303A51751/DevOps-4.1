function Cart({ cart, onUpdateQuantity, onRemove, onClearCart }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <aside className="cart-panel" aria-labelledby="cart-heading">
      <div className="cart-panel-heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h2 id="cart-heading">Cart</h2>
        </div>
        {cart.length > 0 && (
          <button type="button" className="clear-button" onClick={onClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">+</span>
          <p>Cart is Empty</p>
          <span>Add something you love.</span>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt="" className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-title-row">
                    <h3>{product.name}</h3>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="item-price">${(product.price * quantity).toFixed(2)}</p>
                  <div className="quantity-controls" aria-label={`Quantity for ${product.name}`}>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      aria-label={`Decrease ${product.name} quantity`}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button type="button" className="checkout-button">Continue to Checkout</button>
        </>
      )}
    </aside>
  );
}

export default Cart;
