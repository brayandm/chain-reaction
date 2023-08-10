## Installation instructions

1 - Copy the .env.example file to .env and fill in the variables:

```bash
cp .env.example .env
```

2 - Install dependencies:

```bash
npm install
```

3 - Install nodemon globally:

```bash
npm install -g nodemon
```

4 - Run the application:

```bash
nodemon src/WebSocketServer.ts
```

## Docker instructions

1 - Copy the .env.example file to .env and fill in the variables:

```bash
cp .env.example .env
```

2 - Run the application:

```bash
docker compose up
```
