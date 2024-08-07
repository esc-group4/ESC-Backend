# ESC-Backend

## Required Software
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Optional for quickly set up MySQL Server)
- [NPM](https://www.npmjs.com/)

## MySQL (Required)
Two ways to start SQL. Preferably Docker.
1. [Click here to set up MySQL Docker](SQL/README.md)
2. [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Set up

1. Git clone this repo
```console
git clone https://github.com/esc-group4/tsh_sys_backend.git
```

2. Go to folder
```console
cd tsh_sys_backend
```

3. Install NPM Packages
```console
npm i
```

4. Run Express
```console
npm run dev
```

---
Note [InitMockData](SQL/InitMockData.sql) is avaliable in the database when created, add them via `mysql` utility or [MySQL Community Workbench](https://dev.mysql.com/downloads/workbench/)
