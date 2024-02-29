# Comments SPA Application ✅

This repository contains the source code for a Single Page Application (SPA) for managing comments. The application allows users to leave comments, which are then stored in a relational database. Both frontend and backend components are included in this project.

## ✨Technologies Used

- **Backend**:
  - Typescript
  - Object-oriented programming (OOP)
  - PostgreSQL
  - Nest.js
  - ORM
  - REST API
  - WebSocket
- **Frontend**:
  - React.js
  - Material UI
  - AJAX for asynchronous communication with the backend
  - Form validation on the client-side
  - Integration with Google ReCAPTCHA V2 service for user verification
  - Authentication for typing comment
  - Use of cookies for data storage

## 🎉Features

### Backend Features:

- Allows users to leave comments with fields including User Name, Email, Home page, CAPTCHA, and Text.
- Utilizes relational database (PostgreSQL) for persistent data storage.
- Implements server-side validation to protect against XSS attacks and SQL injections.
- Supports image and text file uploads with validation for file size and type.
- Integrates with third-party services for storing files.

### Frontend Features:

- Provides a user-friendly interface for leaving comments.
- Supports image and text file uploads with validation for file size and type.
- Implements client-side form validation to enhance user experience.
- Offers visual effects for file previews and message viewing.

## 🚀Getting Started

First, run the development server:

1.  Make sure you have [Docker](https://www.docker.com/get-started/) installed on your system
2.  Clone the repository and change directory to **dZENCodeTest**:

```bash
git clone https://github.com/firebenderyt123/dZENCodeTest
cd dZENCodeTest
```

### Configurating ⚙️

1.  To configure the **frontend** of application for a production environment, you will need to go to the frontend directory and create an _.env.production_ file based on _.env-example_ and specify the required parameters. Here are the parameters you need to rename and specify:

> **BLOB_HOSTNAME**: This parameter is used to specify the host where media files (images and text files) are stored. You must to use [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs)

> **API_ROOT**: This parameter is used to specify the root URL of your application's API. This is the address of your server where the application's backend code is deployed. For example, if your server is deployed on localhost and listening on port 8000, the URL would be http://localhost:8000/api/v1.

> **WS_ROOT**: This parameter is used to configure a WebSocket connection for real-time communication. For example, if your backend deployed on localhost and is listening on port 8000, the URL would be ws://localhost:8000.

> **GOOGLE_RECAPTCHA_PUBLIC_KEY**: This parameter is used to specify the reCAPTCHA public key if your application uses this service to protect against spam and bots. Get this key from the official [Google reCAPTCHA](https://www.google.com/recaptcha/about/) website. **_You must to use reCAPTCHA v2_**

2. To configure the **backend** of your application, you need to go to the backend directory
   and create an _.env.production_ file based on _.env-example_ and specify the following parameters:

> **POSTGRES_HOST**: The host on which the PostgreSQL database is deployed. This is usually localhost if the database is deployed locally.

> **POSTGRES_PORT**: The port on which PostgreSQL listens for connections. The default is 5432.

> **POSTGRES_DB**: The name of the PostgreSQL database to which your application will connect.

> **POSTGRES_USER**: The PostgreSQL user who has access to the database.

> **POSTGRES_PASSWORD**: The password of the PostgreSQL user to access the database.

> **REDIS_HOST**: The host on which the Redis server is deployed. This variable specifies the hostname or IP address where the Redis server is running. If Redis is deployed locally, you can set this to `localhost`.

> **REDIS_PORT**: The port on which the Redis server listens for connections. The default port for Redis is 6379. If your Redis server is configured to use a different port, specify it here.

> **REDIS_PASSWORD**: The password required to authenticate and access the Redis server. If your Redis server is password-protected, you should provide the password here. If no password is set, leave this variable empty.

> **JWT_SECRET**: The secret key for signing and verifying JWT tokens used for user authentication. Simply generate a long string of different characters

> **JWT_EXPIRATION_TIME**: The lifetime of the JWT token, specified in seconds such time format ("1h" for one hour, "7d" for seven days, etc.).

> **CORS_ORIGIN**: The allowed source for CORS requests. This is the address of your frontend application that will be accessing the backend. Typically, this is http://localhost:3000.

> **AZURE_STORAGE_ACCOUNT_NAME**: The Azure Blob storage account name for Azure Blob Storage.

> **AZURE_STORAGE_ACCOUNT_KEY**: [The Azure Blob Storage account key](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal) required for authentication when accessing the storage.

> **GOOGLE_RECAPTCHA_SECRET_KEY**: [The secret key for reCAPTCHA](https://cloud.google.com/recaptcha-enterprise/docs/create-key-website) verification if your application uses this service to protect against spam and bots.

### Build and Run the App 🔨

1.  Now, if you return to the root project's folder and open the _package.json_ file, you'll see the following:

```bash
{
	"name": "worker",
	"version": "0.1.0",
	"private": true,
	"scripts": {
		"start:backend": "cd backend && docker compose up -d",
		"start:frontend": "cd frontend && docker compose up -d",
		"stop:backend": "cd backend && docker compose down",
		"stop:frontend": "cd frontend && docker compose down",
		"start": "npm run start:backend && npm run start:frontend",
		"stop": "npm run stop:backend && npm run stop:frontend"
	}
}
```

2.  **To build and run** docker containers (frontend and backend), you need to write **one** of the following commands:

```bash
npm run start
```

```bash
yarn start
```

```bash
pnpm start
```

```bash
bun start
```

3. Once the script is successfully executed, you will be able to connect to your application from a browser at the address you have prescribed in the env file. The default is [http://localhost:3000](http://localhost:3000)

## 🤓 Learn More

To learn more about **Next.js**, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

To learn more about **NestJS**, you can explore the following resources:

- [NestJS Documentation](https://docs.nestjs.com/) - Dive into the comprehensive documentation to learn about NestJS features, concepts, and APIs.
- [NestJS Official GitHub Repository](https://github.com/nestjs/nest) - Explore the source code, report issues, and contribute to NestJS development.

Whether you're a beginner looking to get started with NestJS or an experienced developer seeking advanced techniques, these resources offer a wealth of information to help you master NestJS and build powerful applications.
