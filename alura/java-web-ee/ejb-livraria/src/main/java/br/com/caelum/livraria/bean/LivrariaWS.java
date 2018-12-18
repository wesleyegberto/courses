package br.com.caelum.livraria.bean;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

import br.com.caelum.livraria.dao.LivroDao;
import br.com.caelum.livraria.modelo.Livro;

/**
 * Importando usando a ferramenta WSImport:
 * wsimport -s src  -p [pacote] [url_wsdl] 
 */
@WebService
@Stateless
public class LivrariaWS {

    @Inject
    LivroDao dao;

    @WebResult(name="livros")
    public List<Livro> getLivrosPeloNome(@WebParam(name="titulo") String nome) {

        System.out.println("LivrariaWS: procurando pelo nome " + nome);
        return dao.livrosPeloNome(nome);
    }    
}