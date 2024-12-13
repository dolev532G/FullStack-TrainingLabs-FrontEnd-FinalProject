
# **Project Documentation**
 Dolev's PixelCart
 
 ## **Technologies Used**
1. **Frontend Framework:**
   - **React**: Version `^18.3.1` is used for building the user interface.
   - **React-DOM**: Version `^18.3.1` for rendering components to the DOM.

2. **State Management:**
   - **Redux**: Version `^5.0.1` for managing the application's global state.
   - **React-Redux**: Version `^9.1.2` for integrating Redux with React.

3. **Routing:**
   - **React Router DOM**: Version `^7.0.2` for handling client-side routing.

4. **Charting Library:**
   - **Chart.js**: Version `^4.4.7` for rendering charts.
   - **React-Chartjs-2**: Version `^5.2.0` for using Chart.js with React.

5. **Firebase:**
   - **Firebase**: Version `^11.0.2` for backend integration, such as authentication and database operations.

6. **HTTP Requests:**
   - **Axios**: Version `^1.7.7` for making HTTP requests.

7. **Build Tool:**
   - **Vite**: Version `^5.4.10` for fast development and optimized production builds.

8. **Linting and Formatting:**
   - **ESLint**: Version `^9.13.0` for linting JavaScript and React code.
   - **ESLint Plugins:**
     - **React Plugin**: For linting React code.
     - **React Hooks Plugin**: To ensure proper usage of React hooks.

9. **Types:**
   - **@types/react** and **@types/react-dom**: For adding TypeScript support to React and DOM types.

---

## **Project Configuration**

### **Vite Configuration (`vite.config.js`)**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Bind to all IPs on your local network
    port: 5173, // Optional: Specify a port (default is 5173)
    cors: true, // Enable CORS
  },
});
```
- **Server Settings:**
  - `host: true`: Allows access from other devices on the same network.
  - `port: 5173`: Runs the development server on port `5173`.
  - `cors: true`: Enables Cross-Origin Resource Sharing for API access.

---

## **Dependencies**

### **Main Dependencies:**
| Library                | Version   | Purpose                              |
|------------------------|-----------|--------------------------------------|
| `react`               | ^18.3.1   | Core React library                   |
| `react-dom`           | ^18.3.1   | DOM rendering for React components   |
| `redux`               | ^5.0.1    | State management library             |
| `react-redux`         | ^9.1.2    | Integration of Redux with React      |
| `react-router-dom`    | ^7.0.2    | Client-side routing                  |
| `chart.js`            | ^4.4.7    | Chart rendering library              |
| `react-chartjs-2`     | ^5.2.0    | React wrapper for Chart.js           |
| `axios`               | ^1.7.7    | HTTP client for API requests         |
| `firebase`            | ^11.0.2   | Firebase SDK for backend operations  |

### **Development Dependencies:**
| Library                       | Version   | Purpose                                         |
|-------------------------------|-----------|-------------------------------------------------|
| `vite`                        | ^5.4.10   | Build tool for development and production      |
| `@vitejs/plugin-react`        | ^4.3.3    | Vite plugin for React                          |
| `eslint`                      | ^9.13.0   | Linting tool                                   |
| `eslint-plugin-react`         | ^7.37.2   | ESLint plugin for React                        |
| `eslint-plugin-react-hooks`   | ^5.0.0    | Linting rules for React Hooks                  |
| `@types/react`                | ^18.3.12  | TypeScript definitions for React               |
| `@types/react-dom`            | ^18.3.1   | TypeScript definitions for React DOM           |

---

## **NPM Scripts**
The following scripts are available in the `package.json`:

| Script   | Command        | Description                                           |
|----------|----------------|-------------------------------------------------------|
| `dev`    | `vite`         | Start the development server.                        |
| `build`  | `vite build`   | Create a production build of the project.            |
| `lint`   | `eslint .`     | Run the ESLint linter on the project files.          |
| `preview`| `vite preview` | Preview the production build using a local server.   |

---

