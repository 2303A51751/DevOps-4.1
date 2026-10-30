# Online Shopping Product Management

Assignment 10.1.2 is a small full-stack product catalog with an Express REST API and a React interface. Product data is held in memory, so changes reset when the backend restarts.

## Directory structure

```text
2026-10-13/
  README.md
  shopping-backend/
    package.json
    server.js
  shopping-frontend/
    index.html
    package.json
    vite.config.js
    src/
      App.jsx
      index.css
      main.jsx
      services/productService.js
      components/
        Header.jsx
        ProductCard.jsx
        ProductDetails.jsx
        ProductForm.jsx
        ProductList.jsx
        SearchBar.jsx
```

## Run in VS Code

1. Open the repository in VS Code and open a terminal in `2026-10-13/shopping-backend`.
2. Run `npm install`, then `npm run dev`. The API listens on `http://localhost:5000`.
3. Open a second terminal in `2026-10-13/shopping-frontend`.
4. Run `npm install`, then `npm run dev`.
5. Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

Both servers need to stay running. The frontend Axios service is configured to call `http://localhost:5000/api`.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get a product by ID |
| POST | `/api/products` | Create a product (`name`, `category`, `price`) |
| PUT | `/api/products/:id` | Replace a product's editable fields |
| DELETE | `/api/products/:id` | Delete a product |

The frontend includes create, edit, delete, product details, dynamic name/category search, category and price filters, sorting, and a cart with quantity controls and subtotal. No database or checkout payment integration is included.

## Verify

From `shopping-backend`, run `npm test` for API endpoint checks. From `shopping-frontend`, run `npm run build` to create a production build.