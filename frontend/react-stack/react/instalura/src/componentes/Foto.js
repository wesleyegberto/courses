import React, { Component } from 'react';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js';

class FotoAtualizacoes extends Component {
	constructor(props) {
		super(props);
		this.state = {likeada : this.props.foto.likeada};
	}

	like(event) {
		event.preventDefault();
		let token = localStorage.getItem('auth-token');
		fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${token}`, {method: 'POST'})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Não foi possível realizar o like da foto.');
				}
			})
			.then(liker => {
				this.setState({likeada : !this.state.likeada});
				Pubsub.publish('atualiza-liker', { fotoId: this.props.foto.id, liker });
			});
	}

	comenta(event) {
		event.preventDefault();
		const requestInfo = {
			method: 'POST',
			body: JSON.stringify({ texto: this.comentario.value }),
			headers: new Headers({
				'Content-type':'application/json'
			})
		};
		let fotoId = this.props.foto.id;
		fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
			.then(response => {
				if(response.ok){
					this.comentario.value = '';
					return response.json();
				} else {
					throw new Error("não foi possível comentar");
				}
			})
			.then(novoComentario => {
				Pubsub.publish('novo-comentario', { fotoId: this.props.foto.id, novoComentario});
			});
	}
	
	render() {
		return (
			<section className="fotoAtualizacoes">
				<a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
				<form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
					<input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
					<input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
				</form>
			</section>
		);
	}
}

class FotoInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			likers : this.props.foto.likers,
			comentarios: this.props.foto.comentarios
		};
	}
			
	componentWillMount() {
		Pubsub.subscribe('atualiza-liker',(topico, infoLiker) => {
			const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
			if(possivelLiker === undefined) {
				const novosLikers = this.state.likers.concat(infoLiker.liker);
				this.setState({likers:novosLikers});
			} else {
				const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
				this.setState({likers:novosLikers});
			}
		});
		Pubsub.subscribe('novo-comentario', (topico, infoComentario) => {
			if	(this.props.foto.id === infoComentario.fotoId) {
        const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
        this.setState({comentarios: novosComentarios});
    	}
		});
	}
			
	render(){
		return (
			<div className="foto-info">
				<div className="foto-info-likes">
					{this.state.likers.map(liker => <Link key={liker.login} to={`/timeline/${liker.login}`}>{liker.login}</Link>)} curtiram
				</div>
				<p className="foto-info-legenda">
					<Link className="foto-info-autor" to={`/timeline/${this.props.foto.loginUsuario}`}>{this.props.foto.loginUsuario}</Link>
					<span> {this.props.foto.comentario}</span>
				</p>
				<ul className="foto-info-comentarios">
					{this.state.comentarios.map(comentario => (
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