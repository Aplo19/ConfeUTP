# ConfeUTP

Proyecto con frontend en React y backend en NestJS.

## Estructura

```text
CONFEUTP/
+-- UniConfess_Front/        # Frontend React
+-- uni-confess_back_nest/   # Backend NestJS
```


## Base de datos

En phpMyAdmin o MySQL, crear la base de datos:

```sql
CREATE DATABASE IF NOT EXISTS uniconfess
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

El backend usa TypeORM. Con `DB_SYNCHRONIZE=true`, la tabla `users` se crea automaticamente al iniciar el backend.

## Variables de entorno del backend

Crear el archivo:

```text
uni-confess_back_nest/.env
```

Puedes copiar como base `uni-confess_back_nest/.env.example`.

Ejemplo:

```env
PORT=3001
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=uniconfess
DB_SYNCHRONIZE=true

ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=1234
BCRYPT_SALT_ROUNDS=10

JWT_SECRET=cambia_esta_clave_por_una_mas_larga_y_privada
JWT_EXPIRES_IN=1d
```

## Correr el backend

```powershell
cd uni-confess_back_nest
npm install
npm run start:dev
```

El backend corre en:

```text
http://localhost:3001
```

Endpoint de login:

```text
POST http://localhost:3001/auth/login
```

Credenciales iniciales:

```text
email: admin@test.com
password: 1234
```

## Correr el frontend

En otra terminal:

```powershell
cd UniConfess_Front
npm install
npm start
```

El frontend corre en:

```text
http://localhost:3000
```

## Orden recomendado para iniciar

1. Abrir XAMPP y activar MySQL.
2. Crear la base de datos `uniconfess`.
3. Crear `uni-confess_back_nest/.env`.
4. Iniciar el backend con `npm run start:dev`.
5. Iniciar el frontend con `npm start`.
6. Probar login con `admin@test.com` y `1234`.
