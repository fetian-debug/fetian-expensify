import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage = () => (
  <div>
    <Header/>
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">404 Error!</h1>
			</div>
		</div>
		<div className="content-container">
			<img className="not-found" src="\images\404rickmorty.png" />
		</div>
	</div>
);

export default NotFoundPage;
