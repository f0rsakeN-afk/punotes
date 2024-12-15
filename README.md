# Punotes Frontend

This repository contains the frontend code for the Punotes application.  It's a React application built with Vite, TypeScript, and Tailwind CSS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites

* Node.js and npm (or yarn) installed.
* Docker and Docker Compose installed.


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/f0rsakeN-afk/punotes
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

1. Start the development server:

   ```bash
   npm run dev
   ```
   This will start a Vite development server.  You can access the application at `http://localhost:5173` (or the port specified by Vite).


### Building for Production

1. Build the application:

   ```bash
   npm run build
   ```
   This will create a production-ready build in the `dist` directory.


### Running with Docker (Recommended for Production)

1. Build and run the Docker image:

   ```bash
   docker-compose up -d --build
   ```
   This will build the Docker image and start a container running Nginx to serve the application.  Access the application at `http://localhost:8080`.

2. Stop the Docker containers:

   ```bash
   docker-compose down
   ```

### Linting

To run the linter:

```bash
npm run lint
```


## Deployment (Example)

To deploy this application to a platform like Vercel or Netlify, you'll need to build the application using `npm run build` and then deploy the contents of the `dist` folder.  Consult the documentation for your chosen platform for specific deployment instructions.


## Technologies Used

* React
* Vite
* TypeScript
* Tailwind CSS
* Redux Toolkit
* React Router
* Lucide Icons
* Radix UI

