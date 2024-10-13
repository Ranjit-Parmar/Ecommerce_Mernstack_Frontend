import React from 'react';
import ReactDOM from 'react-dom/client';

import Store from './store/Store.js';
import ShopContextProvider from './context/ShopContext.jsx'
import { Provider } from 'react-redux';
import Routes from './routes/Routes.jsx';



 



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ShopContextProvider>
      <Routes/>
    </ShopContextProvider>
  </Provider>
)
