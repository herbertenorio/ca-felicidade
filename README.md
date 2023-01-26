
<p align="center">

 
</p>
<h1 align="center">
    Ca-Felicidade
</h1>

<h4 align="center"> 
	🚧  Em construção 🚧
</h4>


## 💻 Sobre o projeto

 CA-Felicidade - é uma API criada com o objetivo de fazer operações de CRUD, como resposta a um desafio lançado pelo Career Advisor (Felipe Pimentel Augusto) no grupo do estudos da Avanade Brasil, para aprimorar os conhecimentos. Essa API tem basicamente uma ideia de criar Posts.

---

## ⚙️ Funcionalidades concluídas

Usuários

  - [x] Cadastro
  - [x] Authenticão
  - [x] Consulta
  - [x] Atualização

Post

  
Categoria

 
Comentários


Regras

  - [x] Os usuários podem se cadastrar.
  - [x] Os usuários podem alterar os dados depois de authenticado

---

## Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### Executando o serviço da API

```bash

# Clone este repositório
$ git clone https://github.com/herbertenorio/ca-felicidade.git

# Vá para a pasta 
$ cd ca-felicidade

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333 

```
### Criar arquivo ".env" na pasta src do projeto com os parâmetros de conexão do banco
Como referência pode consultar a documentação oficial em **[Prisma.io](https://www.prisma.io/docs/guides/development-environment/environment-variables)**

```bash

DATABASE_URL=postgresql://test:test@localhost:5432/test
DATABASE_URL_WITH_SCHEMA=${DATABASE_URL}?schema=public

```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **API**
  
-   **[NodeJS](https://nodejs.org/en/)**
-   **[TypeScript](https://www.typescriptlang.org/)**
-   **[Prisma ORM](https://www.prisma.io/)**
-   **[Express](https://expressjs.com/)**
-   **[Ts-node-dev](https://github.com/wclr/ts-node-dev)**
-   **[JsonWebToken](https://github.com/auth0/node-jsonwebtoken)**
-   **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)**

> Veja o arquivo  [package.json]

#### **Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**
-   Documentação da API: **[Swagger](https://swagger.io/)**
---

## Autor

 <br />
 <sub><b>Herbert de Gusmão Tenório</b></sub></a>
 <br />

 [![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/herbertenorio/)](https://www.linkedin.com/in/herbertenorio/) 
[![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white&link=mailto:herbertenorio@gmail.com)](mailto:herbertenorio@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença ... [](./LICENSE).

Feito com ❤️ por Herbert de Gusmão Tenório 👋🏽 [Entre em contato!](https://www.linkedin.com/in/herbertenorio/)
