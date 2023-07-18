# API de Autenticação com Mongoose, Express, JWT e MongoDB

Este repositório contém uma API de autenticação simples e poderosa, construída utilizando as seguintes tecnologias: Mongoose, Express, JWT (JSON Web Tokens) e MongoDB.

## Descrição

A API de autenticação oferece recursos robustos para autenticar usuários em aplicações de forma segura. Ela utiliza o Mongoose como ODM (Object Document Mapper) para interagir com o MongoDB, proporcionando uma camada de abstração para facilitar a modelagem e a manipulação dos dados.

A autenticação é baseada no padrão JWT, que permite gerar tokens de acesso criptografados e assinados digitalmente. Esses tokens são enviados para o cliente após a realização bem-sucedida do login, e podem ser usados para autenticar e autorizar solicitações subsequentes. Isso garante a segurança das informações e simplifica o processo de autenticação para os usuários.

## Recursos Principais

- Registro de usuários com senhas criptografadas.
- Autenticação de usuários com geração de token JWT.
- Validação de token para autorização de rotas protegidas.
- Armazenamento seguro de informações no MongoDB.

## Configuração e Uso

1. Instale as dependências usando o gerenciador de pacotes de sua preferência (ex.: npm install).
2. Configure as variáveis de ambiente necessárias (ex.: segredo do JWT, URL do MongoDB, etc.).
3. Inicie o servidor localmente (ex.: npm run start).
4. Acesse a API através do endpoint apropriado (ex.: http://localhost:3000).
