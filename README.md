# tempMonitor
<h1>Monitor de Temperatura</h1>
<h2>Criação da aplicação de um monitor de temperatura</h2>
<p>
Monitoramento por hora durante 30 horas passando por parametro o nome dacidade com rota POST,
<i>Sumário</i>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#arq">Arquitetura</a></li>
    <li><a href="#pcus">Pacotes Usados</a></li>
    <li><a href="end">EndPoints</a></li>
</ul>
</p>
<h2 name="features">Features</h2>
<hr>
<p>
    API criada com typescript para salvar histórico de temperatura de uma determinada cidade por 30 horas, salvando as informações em uma base de dados com possibilidade de retorno desse histórico.
    <h3>Preparado para testes.</h3>
    Foi usado Jest como framework para realizar essa tarefa. Tanto para os unitários como para os de integração, testando o aquivo de lógica das funções responsáveis por uma boa parte da regra de negócio.
</p>
<p>
    <h2 name="arq">Arquitetura</h2>
    Configurando o ambiente e rodando a aplicação
    Depois de criar um gitclone é só utilizar o gerenciador de pacotes de sua preferência.<br>
    <code>npm install</code><br>
    <code>yarn</code><br>
    Dessa forma ele irá instalar os pacotes necessários para qua a plicação funcione normalmente.<br>
    <h3>Teste</h3>
    Como informado foi ultilizado o jest para os tests unitário e de integração. Para rodar os testes local será necessário rodar o comando:<br>
    <code>
        npm run test<br>
        ou<br>
        yarn test<br>
    </code>

</p>
<h2><a  name="pcus">Pacotes Usados</a></h2>
Em resumo...
<table class="table">
  <thead>
    <tr>
      <th scope="col">Nome do Pacote</th>
      <th scope="col">Finalidade</th>
      <th scope="col">Link Documentação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Jest</th>
      <td>Testes</td>
      <td><a href="https://jestjs.io/docs/en/getting-started">Link</a></td>
    </tr>
    <tr>
      <th scope="row">Eslint</th>
      <td> Irá olhar o seu código e vai te acusar os erros baseados na regra que você definir</td>
      <td><a href="https://eslint.org/">Link</a></td>
    </tr>
    <tr>
      <th scope="row">Prettier</th>
      <td>O Prettier é um code formatter livre (MIT) e de código aberto, que tem por finalidade "forçar" um padrão de código.</td>
      <td><a href="https://prettier.io/">Link</a></td>
    </tr>
    <tr>
      <th scope="row">supertest</th>
      <td>Basicamente o Supertest é um módulo que forja requisições visando testar webservers em Node. js e verifica o retorno das mesmas para automatizar testes deste tipo de infraestrutura, principalmente web APIs</td>
      <td><a href="https://www.npmjs.com/package/supertest">Link</a></td>
    </tr>
    <tr>
      <th scope="row">Express.js</th>
      <td>Express.js é um framework para aplicações web para Node.js, lançado como software livre e de código aberto sob a Licença MIT...</td>
      <td><a href="https://www.npmjs.com/package/express">Link</a></td>
    </tr>
    <tr>
      <th scope="row">Msql2</th>
      <td>O projeto MySQL2 é uma continuação do MySQL-Native . O código do analisador de protocolo foi reescrito do zero e a API alterada para corresponder ao popular mysqljs / mysql . A equipe MySQL2 está trabalhando junto com a equipe mysqljs / mysql para fatorar o código compartilhado e movê-lo para a organização mysqljs.
      </td>
      <td><a href="https://www.npmjs.com/package/mysql2">Link</a></td>
    </tr>
    <tr>
      <th scope="row">OvernightJs</th>
      <td>É um decorator para criação de rotas express na aplicação...</td>
      <td><a href="https://www.npmjs.com/package/@overnightjs/core">Link</a></td>
    </tr>
    <tr>
      <th scope="row">Axios</th>
      <td>
        Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node.js.
        É um projeto open source, disponível no Github...
      </td>
      <td><a href="https://www.npmjs.com/package/axios">Link</a></td>
    </tr>
  </tbody>
</table>

<h2><a name="end">Endpoints</a></h2>
  <p><b>Rotas Locais</b></p>
  <table>
  <thead>
    <tr>
      <th scope="col">Verbo HTTP</th>
      <th scope="col">Rota Local</th>
      <th scope="col">Function</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>POST</th>
      <th>http://localhost:3000/cities/:city</th>
      <th>Criar Histórico</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>http://localhost:3000/cities/:city</th>
      <th>Retornar Histórico</th>
    </tr>
    <tr>
      <th>PATCH</th>
      <th>http://localhost:3000/cities/:city</th>
      <th>Apaga o Histórico da cidade cadastrada</th>
    </tr>
    <tr>
      <th>DELETE</th>
      <th>http://localhost:3000/cities/:city</th>
      <th>Deleta a cidade como um todo</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>http://localhost:3000/cities/cep/:cep</th>
      <th>Passando o cep da cidade irá salvar os dados que vem de uma API externa.</th>
    </tr>
  </tbody>
  </thead>
  </table>
  <br>
  <p>
    <i>OBS: A aplicação está no Heroku, todas as rotas estão disponíveis no link</i>
    <code>https://monitortemperature1.herokuapp.coms</code>
  </p>