package br.alura.refatoracao.cap1;

public class GeradorDeNotaFiscal {

	public NotaFiscal gera(Fatura fatura) {
		NotaFiscal nf = geraNF(fatura);
		enviaEmail(nf);
		persisteNF(nf);
		return nf;
	}

	private void persisteNF(NotaFiscal nf) {
		// salva no banco
		String sql = "insert into notafiscal (cliente, valor)" + "values (?," + nf.getValorLiquido() + ")";

		System.out.println("Salvando no banco" + sql);
	}

	private void enviaEmail(NotaFiscal nf) {
		// envia email
		String msgDoEmail = "Caro cliente,<br/>";
		msgDoEmail += "É com prazer que lhe avisamos que sua nota fiscal foi " + "gerada no valor de "
				+ nf.getValorLiquido() + ".<br/>";
		msgDoEmail += "Acesse o site da prefeitura e faça o download.<br/><br/>";
		msgDoEmail += "Obrigado!";

		System.out.println(msgDoEmail);
	}

	private NotaFiscal geraNF(Fatura fatura) {
		// calcula valor do imposto
		double valor = fatura.getValorMensal();
		double imposto = 0;
		if (valor < 200) {
			imposto = valor * 0.03;
		} else if (valor > 200 && valor <= 1000) {
			imposto = valor * 0.06;
		} else {
			imposto = valor * 0.07;
		}
		NotaFiscal nf = new NotaFiscal(valor, imposto);
		return nf;
	}
}