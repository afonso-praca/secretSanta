var request = require('request');
var _ = require('underscore');

function pessoa(nome, email){
	this.nome = nome,
	this.email = email
};

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function sendEmail(pessoa, amigo){
	request.post(
	    'http://afonsopraca.com.br/aoc/envia_ao_amigo.php',
	    { form:
	    	{
	    		"seu_nome": pessoa.nome,
	    		"seu_email": pessoa.email,
	    		"nome_amigo": amigo.nome,
	    		"email_amigo": amigo.email
	    	}
	    },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log("enviou");
	        }
	    }
	);
}

var arrayPessoas = [
	new pessoa("Afonso Praça", "afonsoinfo@gmail.com"),
	new pessoa("Daniela Soria", "danisoriafisio@gmail.com")
];

arrayPessoas = shuffle(arrayPessoas);

for (var i = 0; i < arrayPessoas.length; i++) {
	if (i != arrayPessoas.length-1)
		sendEmail(arrayPessoas[i], arrayPessoas[i+1]);
	else
		sendEmail(arrayPessoas[i], arrayPessoas[0]);
};