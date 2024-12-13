import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/rootReducer.js';

import { BrowserRouter } from 'react-router-dom';

// Create the Redux store
const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap your app in the Redux Provider */}
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>
);
