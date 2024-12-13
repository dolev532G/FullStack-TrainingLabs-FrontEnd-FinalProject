const initialState = {
  LogedUser: [],
  products: [],
  cart: {},
  orders: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LoginUser': {
      return { ...state, LogedUser: action.payload };
    }
    case 'SetProducts': {
      return { ...state, products: action.payload };
    }
    case 'AddToCart': {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p.id === productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return state;
      }

      const updatedCart = {
        ...state.cart,
        [productId]: {
          ...state.cart[productId],
          title: product.title,
          price: product.price,
          quantity,
        },
      };

      if (quantity === 0) {
        delete updatedCart[productId]; // Remove item if quantity is 0
      }

      return { ...state, cart: updatedCart };
    }
    case 'RemoveFromCart': {
      const { productId } = action.payload;
      const updatedCart = { ...state.cart };
      delete updatedCart[productId];
      return { ...state, cart: updatedCart };
    }
    case 'UpdateProductStock': {
      const { productId, stock } = action.payload;
      const updatedProducts = state.products.map((product) =>
        product.id === productId ? { ...product, stock } : product
      );
      return { ...state, products: updatedProducts };
    }
    case 'AddOrder': {
      const { order } = action.payload;
      return { ...state, orders: [...state.orders, order] };
    }
    case 'SetCart': {
      return { ...state, cart: action.payload };
    }
    
    default:
      return state;
  }
  
};

export default usersReducer;
