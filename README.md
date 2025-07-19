# NestJS MongoDB App

A NestJS application with MongoDB integration for managing users, companies, projects, and permissions, featuring JWT authentication, role-based authorization, DTO validation, and Swagger API documentation.

## Features

- **User, Company, Project, Permission entities** with Mongoose schemas
- **JWT Authentication** (`/auth/login`)
- **Role-based Authorization** using Permission entity and custom guards
- **DTO Validation** with `class-validator` and `class-transformer`
- **Swagger API Documentation** at `/api`
- **Secure endpoints** with `@UseGuards(AuthGuard('jwt'), PermissionGuard)`
- **Company-project one-to-many relationship**
- **Permission entity** for user/company/role mapping

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Environment

Set your MongoDB connection string and JWT secret in `.env` or directly in `app.module.ts` and `auth.module.ts`.

### 3. Run the app

```sh
npm run start:dev
```

### 4. API Documentation

Visit [http://localhost:3000/api](http://localhost:3000/api) for Swagger UI.

## Main Endpoints

### Auth

- `POST /auth/login` — Login with email and password, returns JWT

### User

- `POST /users` — Create user (name, email, password)
- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user

### Company

- `POST /company` — Create company (name, industry)
- `GET /company/:id` — Get company by ID
- `PUT /company/:id` — Update company
- `DELETE /company/:id` — Delete company

### Project

- `POST /project` — Create project (name, description, status, priority, tags, companyId)
- `GET /project/:companyId` — Get projects for a company
- `PUT /project/:id` — Update project
- `DELETE /project/:id` — Delete project

### Permission

- `POST /permission/add` — Add permission (admin only)
- `DELETE /permission/remove` — Remove permission (admin only)

## Security

- All endpoints (except `/auth/login`) require JWT authentication.
- Project and permission endpoints require appropriate permissions.

## Validation

- All create/update endpoints use DTOs with `class-validator` for input validation.

## License

This project is licensed under the MIT License.