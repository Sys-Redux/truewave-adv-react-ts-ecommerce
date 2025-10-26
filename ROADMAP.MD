# Project Requirements

## Product Catalog

## Product Listing and Display

- Use React Query to retrieve all of the products in the store and display them on the Home component.
- Show the title, price, category, description, rate, and image for each product.
- Each product should have a button that allows the user to add it to the shopping cart.

⚠️ Note on Images:Some image URLs provided by the FakeStore API currently return 404 errors. This is an API-side issue (the image files were removed or rotated), not a problem with your code. To handle this gracefully, implement a fallback so that if an image fails to load, a placeholder (for example, from [https://via.placeholder.com]) is displayed. This ensures the UI still looks consistent and usable.

## Category Navigation

- Provide a select dropdown that allows users to select a product category.
- Use React Query to request the endpoint that returns an array of all categories: GET [https://fakestoreapi.com/products/categories]
- The dropdown should not be hard coded. It should dynamically pull the values from the API.
- When the user selects a different category from the dropdown, only display the products from that category. Use React Query to request the category-specific endpoint:GET [https://fakestoreapi.com/products/category/{category}]
- This endpoint returns the full product objects for that category (including title, price, category, description, rate, and image).

Shopping Cart:

- State Management with Redux Toolkit:
  - Utilize Redux Toolkit for managing the shopping cart state, including adding, updating, and removing products from the cart.
  - Define reducers and actions to handle cart-related state changes and interactions with the FakeStoreAPI.
- Shopping Cart Component:
  - Create a Shopping Cart component where users can view and manage the products within their cart.
  - Display a list of products currently added to the cart including the title, image, count, and price of each product.
  - Each product should have a button that removes it from the cart
  - REMEMBER: Users should be able to add products to the shopping cart directly from the home product listing page.
- Session Storage for Shopping Cart:
  - Store, retrieve, and update the shopping cart data in sessionStorage to ensure persistence across different components and browser sessions.
  - Store the shopping cart as an array of product objects
- Total Amount and Price Calculation:
  - In the shopping cart component, display the total number of products in the cart
  - Display the total price of all the products in the cart.
  - Update these values dynamically as users modify the contents of their cart, ensuring accuracy and real-time feedback.
- Checkout Functionality:
  - Implement a checkout feature allowing users to complete their purchases.
  - FakeStoreAPI does not have a way to process orders so this feature should simulate a checkout by clearing the Redux state and sessionStorage
  - Provide visual feedback to users upon successful checkout, indicating that their cart has been cleared.
