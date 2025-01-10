import { createContext, useState } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// Create the CartContext with a default structure
export const CartContext = createContext({
  items: [], // Shopping cart items
  addItemToCart: () => {}, // Function to add items to the cart
  updateItemQuantity: () => {}, // Function to update item quantity
});

// CartContextProvider Component
export default function CartContextProvider({ children }) {
  
    const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  // Function to handle adding items to the cart
  function handleAddItemToCart(id) {
    if (!id) return; // Ensure id is valid
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      if (existingCartItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems[existingCartItemIndex] = {
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity + 1,
        };
      } else {
        // Add new item to the cart
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        if (product) {
          updatedItems.push({
            id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return { items: updatedItems };
    });
  }

  // Function to handle updating item quantity in the cart
  function handleUpdateCartItemQuantity(productId, amount) {
    if (!productId || !amount) return; // Ensure inputs are valid
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const itemIndex = updatedItems.findIndex((item) => item.id === productId);

      if (itemIndex >= 0) {
        const updatedItem = { ...updatedItems[itemIndex] };
        updatedItem.quantity += amount;

        if (updatedItem.quantity <= 0) {
          // Remove item if quantity is 0 or less
          updatedItems.splice(itemIndex, 1);
        } else {
          // Update the quantity
          updatedItems[itemIndex] = updatedItem;
        }
      }

      return { items: updatedItems };
    });
  }

  // Context value to provide
  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };
  

  // Render the context provider
  return <CartContext.Provider value={ctxValue}>
  {children}
</CartContext.Provider>
}
