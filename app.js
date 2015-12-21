var _ = require('underscore');
var emailjs = require('emailjs');

var config = {
  "user": "",
  "password": "",
  "host": "",
  "ssl": true
};

var server = emailjs.server.connect(config);

function Pessoa(nome, email){
	this.nome = nome;
	this.email = email;
}

function sendEmail(pessoa, amigo){
  var text = "Olá " + pessoa.nome + "!<br>";
  text += "Seu amigo oculto é " + amigo.nome + ".<br>";
  text += "Que o natal seja repleto de alegria.<br><br>";
  text += "Um Beijo do Papai Noel, da Dani e do Afonso";

  options = {};
  options.to = pessoa.nome + " <" + pessoa.email + ">";
  options.from = "Papai Noel do Humaitá <loja@pilateslovers.com.br>";
  options.subject = "Amigo Oculto Soria Texeira";
  options.text = text;
  options.attachment =
    [
      {
        data: text,
        alternative: true
      }
    ];

  server.send(options, function(){
    console.log("email enviado");
  });
}

var arrayPessoas = [
	new Pessoa("Nome", "email@email.com"),
	new Pessoa("Nome2", "email2@email.com")
];

arrayPessoas = _.shuffle(arrayPessoas);

for (var i = 0; i < arrayPessoas.length; i++){
	if (i != arrayPessoas.length-1){
    sendEmail(arrayPessoas[i], arrayPessoas[i+1]);
  } else {
    sendEmail(arrayPessoas[i], arrayPessoas[0]);
  }
}