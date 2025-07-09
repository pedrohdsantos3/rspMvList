# 🎬 Raspberry Movie Awards

Este projeto expõe uma API REST que importa dados de filmes a partir de um CSV e calcula os **produtores com os menores e maiores intervalos de vitórias** no prêmio "Pior Filme" do Golden Raspberry Awards.

---

## 🚀 Tecnologias

- **NestJS** (framework backend)
- **Prisma ORM**
- **PostgreSQL**
- **Jest** (testes unitários e E2E)
- **Supertest** (para integração)
- **CSV Parser**

---

## 📦 Pré-requisitos

Certifique-se de ter instalado:

- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) *(opcional, para ambiente isolado)*

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz utilizando o arquivo env.sample fornecido no repositório:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/raspberry"
```

> Ajuste os dados conforme seu ambiente local (usuário, senha e porta do Postgres).

---

---

## clonar o repositório

```bash
git clone git@github.com:pedrohdsantos3/rspMvList.git
```

---

## 🧱 Instalação

```bash
npm install
```

---

## Banco de Dados

```bash
npx prisma migrate deploy
npx prisma db push

```

---

## 🛠️ Rodando a aplicação

```bash
npm run start:dev
```

A API será exposta em:  
👉 `http://localhost:3002`

---

## 📥 Importação do CSV

Implemente a importação utilizando a função:

```ts
import { loadMoviesFromCsv } from './utils/load-csv';
```

Por padrão, os dados do CSV devem conter:

- `year`
- `title`
- `studios`
- `producers`
- `winner` (yes/empty)

---

## 📡 Endpoint

### `GET /awards/intervals`

Retorna os produtores com o **maior e menor intervalo** entre vitórias no prêmio.

#### ✅ Exemplo de resposta:

```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

---

## 🧪 Rodando os testes

### Testes Unitários

```bash
npm run test
```

### Testes E2E

```bash
npm run test:e2e
```

> O E2E usa dados mockados de fixtures e limpa o banco a cada teste.

---

## 🗃️ Estrutura

```
src/
  ├── application/
  │   └── services/
  ├── core/
  │   └── types/
  ├── infrastructure/
  │   └── database/
  └── presentation/
      └── controllers/
test/
  └── awards/
      ├── awards-intervals.e2e-spec.ts
      └── fixtures/
          ├── movies.fixture.ts
          └── movies.tie.fixture.ts
```

---
