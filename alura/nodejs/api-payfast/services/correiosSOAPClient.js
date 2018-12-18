const soap = require('soap');

function CorreiosSOAPClient() {
	this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.calculaPrazo = function(args, callback) {
	soap.createClient(this._url, function(err, client) {
		console.log('SOAP client created');
		client.CalcPrazo(args, callback);
	});
}

module.exports = function() {
	return CorreiosSOAPClient;
}