# Help Desk Ticket Management System

## Quickstart

1. Clone repo on local computer using `git clone https://github.com/nicbrown1121/help-desk-system.git`

### Postgres Database

1. Install and run PostgreSQL on your machine.
2. Open your terminal and start the PostgreSQL interactive terminal:
   ```bash
   psql -U postgres
   ```
3. Create a new database and user:
   ```sql
   CREATE DATABASE help_desk_db;
   CREATE USER user123 WITH ENCRYPTED PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE help_desk_db TO user123;
   ALTER USER user123 WITH CREATEDB;
   \q
   ```

### Client

1. cd into /client directory
2. Install dependencies with command `npm install`
3. Create .env file based off .env.example file
4. Run client with `npm run` command

### Server

1. cd into /client directory
2. Install dependencies with command `npm install`
3. Create .env file in /server directory based off .env.example.
4. Run prisma migration step `npx prisma migrate dev --name init`
5. Run server with `npm run start`
