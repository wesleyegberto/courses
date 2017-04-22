import React, { Component } from 'react';
import { Link } from 'react-router';

class FotoAtualizacoes extends Component {
	render(){
		return (
			<section className="fotoAtualizacoes">
				<a href="#" className="fotoAtualizacoes-like">Likar</a>
				<form className="fotoAtualizacoes-form">
					<input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
					<input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
				</form>
			</section>
		);
	}
}

class FotoInfo extends Component {
	render(){
		return (
			<div className="foto-info">
				<div className="foto-info-likes">
					{this.props.foto.likers.map(liker => <Link key={liker.loginUsuario} to={`/timeline/${liker.loginUsuario}`}>{liker.loginUsuario}</Link>)} curtiram
				</div>
				<p className="foto-info-legenda">
					<Link className="foto-info-autor" to={`/timeline/${this.props.foto.loginUsuario}`}>{this.props.foto.loginUsuario}</Link>
					<span> {this.props.foto.comentario}</span>
				</p>
				<ul className="foto-info-comentarios">
					{this.props.foto.comentarios.map(comentario => (
						<li className="comentario" key={comentario.id}>
							<Link className="foto-info-autor" to={`/timeline/${comentario.loginUsuario}`}>{comentario.loginUsuario} </Link>
							<span> {comentario.texto}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

class FotoHeader extends Component {
	render(){
		return (
			<header className="foto-header">
				<figure className="foto-usuario">
					<img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
					<figcaption className="foto-usuario"><Link to={`/timeline/${this.props.foto.loginUsuario}`}>{this.props.foto.loginUsuario}</Link></figcaption>
				</figure>
				<time className="foto-data">{this.props.foto.horario}</time>
			</header>
		);
	}
}

export default class Foto extends Component {
	render(){
		return (
			<div className="foto">
				<FotoHeader foto={this.props.foto}/>
				<img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
				<FotoInfo foto={this.props.foto}/>
				<FotoAtualizacoes foto={this.props.foto}/>
			</div>
		);
	}
}