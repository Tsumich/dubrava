import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import './search.css';
import './table.css'
import './room.css'
import './sidebar.css'
import './admin.scss'
import './index.scss'
import '../node_modules/react-chatbot-kit/build/main.css'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
			<Provider store={store}>
				<App />
				</Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
