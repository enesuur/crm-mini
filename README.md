# 👋 CRM-Mini

This guide will help you set up your Crm-mini development environment and introduce you to the essential scripts for working with the project. Let's get started!

## 🛠️ Setting Up Your Development Environment

To ensure a smooth and efficient development experience with Crm-mini, please align your local environment with the following core versions:

```bash
Node.js: v20.18.0^
Yarn: yarn@4.6.0^
Typescript Version: 5.1.3^
Next.js Version: 15.3.1^
```

PS: If you have a different Node.js version installed, don't worry — you can easily manage and switch between Node versions using nvm (Node Version Manager).

Using these versions will help avoid compatibility issues and guarantee the best performance while working on the project.

#### ✨ Important Note: We highly recommend using Yarn v4.6.0 for the most seamless setup. If you encounter any issues during installation, double-check your Yarn version!

## ⚙️ Project Setup

Clone the Project:

First, clone the crm-mini repository to your local machine using Git. Replace <project_repository_url> with the actual URL of the crm-mini repository.

```bash
git clone https://github.com/enesuur/crm-mini.git
cd frontend
```

## Install Dependencies:

Once you've navigated into the project directory, you need to install the necessary dependencies. Crm-mini uses either Yarn, npm, or pnpm as a package manager. Choose your preferred one and run the corresponding command:

```
yarn install
# or
npm install
# or
pnpm install
```

Once you've got downloaded dependencies to your project, you need to go to backend directory to do same logic again. crm-mini uses either Yarn, npm, or pnpm as a package manager. Choose your preferred one and run the corresponding command:

```
yarn install
# or
npm install
# or
pnpm install
```

This command will download and install all the packages listed in the package.json file.

## 📜 Understanding the Scripts (package.json)

The package.json file contains a set of handy scripts to automate common development tasks. Here's a breakdown of what they do:

```bash
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
..goes on
}
```

---

## 🚀 Running the Application

Now that you've set up your environment and installed the dependencies, you can finally run the crm-mini application!

Start the Front End Development Server:

Use the dev script to start the development server. This will typically start the server at http://localhost:3000.

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
```

Start the Back End End Development Server:

Use the dev script to start the development server. This will typically start the server at http://localhost:8000.

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
```


This project has been implemented based on the tasks defined in the project documentation. It is a full-featured, full-stack application that includes both frontend and backend components developed with modern web technologies and best practices.

The frontend is built using Next.js and leverages tools like TanStack Query for efficient data fetching and caching, Axios for handling HTTP requests, and TypeScript for type safety and maintainability. The entire frontend is fully responsive, designed to deliver a seamless experience across all device sizes — from mobile phones to large desktop screens.

The backend is developed using Express.js and MongoDB, following a feature-based architecture that allows for better modularity, scalability, and maintainability of the codebase. Each feature is isolated in its own directory with its own controller, service, routes, and model, making development and debugging more streamlined.

A variety of performance and security optimizations have been implemented in the backend. These include:

Rate limiting using libraries such as express-rate-limit to prevent abuse and ensure fair usage

Request validation and sanitization to protect against common injection attacks

Environment-based configuration for clean separation of production, development, and testing setups

Error handling middleware to provide consistent error responses and improved debugging

Efficient database indexing and query optimization to handle large-scale data without compromising performance

Additional key features include:

Modular middleware pipeline for logging, CORS, compression, and security headers

RESTful API structure with well-documented endpoints

Clean separation of concerns between layers (controller, service, data)

Scalable project structure ready for deployment

Overall, this project reflects a production-grade setup that balances developer productivity, performance, and security. It demonstrates a comprehensive understanding of modern web development principles and includes a number of best practices that align with real-world use cases.





## ✨ View in Your Browser:

Open your web browser and navigate to http://localhost:3000 or http://127.0.0.1:3000 . You should now see the crm-mini application up and running. Any changes you make to the code will typically be reflected in the browser automatically, thanks to hot reloading.

### ❗ License

This project is publicly accessible for use and collaboration; however:

- You may NOT sell, resell, or redistribute this project or any part of it commercially without explicit written permission from Crm-mini.
- Usage, modification, and personal or educational use are permitted.
- The software is provided "as is," without any warranty.

Please respect these terms to maintain fair use and protection of the project.
