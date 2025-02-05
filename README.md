PokeShop
Welcome to PokeShop, a project developed with React, React Router, TypeScript, RTL, Vitest, and lots of love.

If you want to get right into using the application, you can visit the deployed version here:

https://poke-shop-ukun.vercel.app/

Installation and Setup
To get started, follow these steps:

Clone the repository:

git clone https://github.com/CarlosHdez02/pokeShop
Navigate to the project directory:

cd pokeShop
Install the dependencies:

npm install
You are now ready to run the app. The available scripts are:


"scripts": {
  "dev": "vite",                         // Run the development server
  "build": "tsc -b && vite build",        // Build the project
  "lint": "eslint .",                     // Run linting
  "preview": "vite preview",             // Preview the build
  "test": "vitest",                       // Run tests
  "test:ui": "vitest --ui",               // Run tests with a UI
  "test:coverage": "vitest run --coverage", // Run tests with code coverage
  "test:watch": "vitest watch"           // Watch for test changes
}
Project Architecture
The application's source code is structured in the src folder and divided into the following layers:

Components: Reusable UI components
Context: React Context for global state management
ErrorBoundary: Error handling components
Hooks: Custom React hooks
Interfaces: TypeScript interfaces for type safety
Layouts: Layouts for different pages
Pages: Main application pages
Services: API and service layer
Static: Static assets (images, icons, etc.)
Test: Unit and integration tests
Utils: Utility functions
An Error Boundary class is implemented at the src level to handle errors during the component lifecycle.

Technical Decisions
State Management: React Context was chosen for managing the global state of the application. This approach is simple and works well for this project.

Testing: Vitest was selected as the testing framework instead of Jest due to its better compatibility with Vite, the build tool used for this project. Vitest offers fast, efficient testing with an integrated UI and support for code coverage.

Optimization
For optimization, the following techniques were implemented:

Lazy Loading: To optimize loading times, components are lazy-loaded when required.
React Optimization Hooks: useCallback is used to memoize expensive functions, and useMemo is used to memoize expensive values, improving performance.

Potential Improvements
Code Coverage: While some parts of the application are tested, there is potential for improved code coverage. Due to time constraints and project requirements, not every aspect of the app is currently covered by tests.

Server-Side Rendering (SSR): Currently, the application fetches data from the client side, which is not optimal. For scalability, I would consider adopting a framework like Next.js for SSR. If we were to have a separate backend, a NestJS or ExpressJS server with TypeScript could be a good choice for handling server-side logic.
