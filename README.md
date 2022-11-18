# :busts_in_silhouette: Characters Book backend

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Rotas não autenticadas:](#Rotas-não-autenticadas)
    - [Cadastro](#Cadastrar-um-usuário)
    - [Login](#Login)
    - [Listar personagens](#Listar-personagens)
  - [*Rotas autenticadas*:](#Rotas-autenticadas)
    - [Criar personagem](#Criar-personagem)
    - [Editar personagem](#Editar-personagem)
    - [Apagar personagem](#Apagar-personagem)
    - [Logout](#Logout)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

# Sobre
Characters Book é uma api para a criação e compartilhamento de personagens, seja para um livro de romance, seja para um RPG.

<br/>

# Rotas
## Rotas não autenticadas

## Cadastrar um usuário
- Rota: `/auth/sign-up`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "souichi",
    "password": "123",
    "confirmPassword": "123"
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campos com tipos diferente de string
	- Campo *confirmPassword* diferente do campo *password*
	- Dados informados já correspondem a um usuário

## Login
- Rota: `/auth/sign-in`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "souichi",
    "password": "123"
  }
  ```

- Exemplo de Resposta:

  ```json
  {
    "token": "pwoehfcnmçksh.dflkjskbckjl.jfoakspfoiwujknfcç"
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campos com tipos diferente de string
	- Dados informados não correspondem a nenhum usuário

## Listar personagens
- Rota: `/characters`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "name": "Rosa Martinez",
      "description": "Pequena mulher cujos olhos safira espanta a todos. [...]",
      "history": "Embora nascida na Colômbia, cresceu em Nova Iorque, [...]",
      "by": "queijodemaçã",
      "skills": ["culinária"],
      "createdAt": "2022-11-18T00:25:02.647Z",
      "editedAt": "2022-11-18T00:25:02.647Z"
    }
  ]
  ```
- Query parameters suportadas:
	- name: filtra os personagens pelo nome
		- Exemplo: `/characters/?name=rosa`
	- skill: filtra os personagens pela skill
		- Exemplo: `/characters/?skill=culin`
	- by: filtra os personagens pelo nome do autor
		- Exemplo: `/characters/?by=queijod`

<br/>

## Rotas autenticadas
- Enviar Header Authorization no formato: `Bearer {token}`
- Possíveis erros:
	- Header Authorization ausente
	- Token inválido

## Criar personagem
- Rota: `/characters`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "Ivan Fonseca",
    "description": "Homem misterioso. Não tem amigos e não fala muito, está sempre fumando em seu escritório.",
    "history": "Nada se sabe sobre sua vida, apenas que é um detetive de homicídios.",
    "skills": ["lógica", "perspicácia", "observação"]
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campo *name*, *description* e *history* com tipos diferente de string
	- Campo *skills* com tipo diferente de array
	- Campo *skills* sem valores ou com conteúdo com tipo diferente de string
	- Nome de personagem já existe

## Editar personagem
- Rota: `/characters/{id}`
- Método: `PUT`
- Exemplo de Body:

  ```json
  {
    "name": "Ivan Fonseca",
    "description": "Homem misterioso. Não tem amigos e não fala muito, está sempre fumando em seu escritório.",
    "history": "Nada se sabe sobre sua vida, apenas que é um detetive de homicídios.",
    "skills": ["lógica", "perspicácia", "observação"]
  }
  ```

- Possíveis erros:
	- Campos vazios
	- Campo *name*, *description* e *history* com tipos diferente de string
	- Campo *skills* com tipo diferente de array
	- Campo *skills* sem valores ou com conteúdo com tipo diferente de string
	- Nome de personagem já existe
	- Parâmetro *id* com tipo diferente de número ou correspondente a um personagem não existente
	- Personagem não pertence ao solicitante da requisição

## Apagar personagem
- Rota: `/characters/{id}`
- Método: `DELETE`
- Possíveis erros:
	- Parâmetro *id* com tipo diferente de número ou correspondente a um personagem não existente
	- Personagem não pertence ao solicitante da requisição

## Logout
- Rota: `/auth/sign-out`
- Método: `POST`

<br/>

# Como rodar em desenvolvimento
**Atenção:** para rodar o projeto é preciso ter o PostgreSQL em sua máquina.

<br/>

1. Clone esse repositório:
>```ruby
> git clone https://github.com/AnaLTFernandes/characters-book.git
>```

2. Instale as dependências:
>```ruby
> npm install
>```

3. Crie um banco de dados PostgreSQL com o nome que desejar

4. Configure o arquivo `.env` usando como base o arquivo `.env.example`

5. Rode as migrations para criar as tabelas
>```ruby
> npm run migration:generate
>
> # Caso queira resetar as migrations, rode:
> npm run migration:reset
>```

5. Popule o banco de dados:
>```ruby
> npm run seed
>```

6. Inicie o projeto:
>```ruby
> npm run dev
>```

7. Divirta-se nas rotas usando de URL base: http://localhost:porta_definida_no_env
