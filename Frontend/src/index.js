import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './Component/Store/Store';
import { ChakraProvider } from '@chakra-ui/react'
const env=process.env.NODE_ENV;
export let baseUrl="";
if(env==="development")
 baseUrl="http://localhost:8080";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
        <ChakraProvider>
    <App />
    </ChakraProvider>
    </Provider>
 
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
