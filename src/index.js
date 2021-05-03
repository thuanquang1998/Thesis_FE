import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './approuter';
// boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

//fontawesome
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

import './patient/assets/css/all.css'
import './patient/assets/css/all.min.css';
import './patient/assets/css/fontawesome.min.css';
import 'react-image-lightbox/style.css';
import "react-datepicker/dist/react-datepicker.css";
import "./patient/assets/js/script.js";
//carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//style
import './patient/assets/css/style.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


ReactDOM.render(<Provider store={store}><AppRouter/></Provider>, document.getElementById('root'));