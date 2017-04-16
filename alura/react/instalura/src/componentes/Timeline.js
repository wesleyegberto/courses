import React, { Component } from 'react';
import Foto from './Foto';

export default class Timeline extends Component {

	constructor() {
		super();
		this.state = {
			fotos: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:8080/api/public/fotos/rafael')
			.then(response => response.json())
			.then(fotos => this.setState({ fotos: fotos }));
	}

	render(){
		return (
		<div className="fotos container">
			{this.state.fotos.map(ft => <Foto foto={ft} />)}
		</div>
		);
	}
}