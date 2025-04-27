#  Calculator App – Full Stack Microservices Project

##  Project Overview

This project implements a **full-stack calculator application** designed for **cloud deployment**, **scalability**, and **automation**.  
It follows modern **cloud-native microservices architecture** and satisfies **production-grade requirements**.

The solution includes:

-  **Frontend**: Angular Single Page Application (SPA) for user interactions.
-  **Backend APIs**:
    - **BasicCalculatorApi** – simple operations (+, -, *, /).
    - **AdvancedCalculatorApi** – advanced operations (sqrt, %, ^, etc.).
-  **PostgreSQL Database**: Stores user calculation history.

Everything is integrated through **Azure**, **GitHub Actions CI/CD**, **Docker**, and **Feature Management**.

---

##  Features Implemented

### ✅ 1. Design for Rollback (Versioned GitHub Repository)

- All application code (frontend and backend) is stored in a **GitHub repository** with full version control.
- Rollback is achieved by:
    - Reverting to a previous Git commit.
    - Re-triggering the deployment through GitHub Actions.
- Manual redeployments ensure that previous working versions are quickly restored if needed.

🔹 **Planned Future Improvement**:  
Introduce **Azure Deployment Slots** for faster, automatic rollback without redeployment (instant swap between Staging and Production).

➡️ **Result**: Reliable rollback process enabled via Git versioning. Future plan: zero-downtime rollbacks.

---

### ✅ 2. Design to be Disabled (Feature Toggles)

- Integrated **Microsoft.FeatureManagement** in the backend.
- **Save Calculation History** feature can be dynamically toggled ON/OFF at runtime without requiring redeployment.
- Frontend adapts dynamically based on backend feature state.

➡️ **Result**: Features can be enabled or disabled live, improving flexibility and safety.

---

### ✅ 3. Build Fast, Release Small, Fail Fast

- Microservices are separated:
    - **BasicCalculatorApi** and **AdvancedCalculatorApi** can be built and deployed independently.
- Frontend builds independently from the backend.
- GitHub Actions automates builds and deployments on every push to the `main` branch.

➡️ **Result**: Smaller, faster releases, minimized risk of failure, and easier troubleshooting.

---

### ✅ 4. Automation Over People (Full CI/CD Pipeline)

- Full CI/CD setup using **GitHub Actions**:
    - Checkout repository.
    - Build Angular frontend and .NET Core backends.
    - Publish artifacts.
    - Deploy automatically to **Azure Web Apps**.
    - Database connection strings and secrets securely injected via **GitHub Secrets**.

➡️ **Result**: Fully automated deployment process; no manual intervention required for deployment.

---

### ✅ 5. Design for Two Axes of Scale (Scale Cube Architecture)

- **X-Axis (Horizontal Cloning)**:
    - APIs are deployed with **multiple replicas** to allow for load balancing and horizontal scaling.
- **Y-Axis (Functional Decomposition)**:
    - The calculator logic is split into **two microservices**:
        - `BasicCalculatorApi` (basic operations)
        - `AdvancedCalculatorApi` (scientific/advanced operations)

➡️ **Result**: System is prepared to scale horizontally (user load) and functionally (new services).

---

##  Technologies Used

- **.NET Core 8 (ASP.NET Web API)**
- **Angular 17**
- **PostgreSQL**
- **Docker / Docker Compose**
- **Azure App Services** + **Azure Database for PostgreSQL**
- **Azure Deployment Slots** *(Planned)*
- **GitHub Actions (CI/CD Pipelines)**
- **Microsoft.FeatureManagement**

---

##  Architecture Overview

```plaintext
Frontend (Angular SPA)
    ↓
BasicCalculatorApi (Azure Web App)
    ↓
AdvancedCalculatorApi (Azure Web App)
    ↓
PostgreSQL Database (Azure PostgreSQL)

```



# **Frontend - Calculator Web App (Angular)**

The frontend of this project is built using the latest **Angular 17** framework.

It provides a modern, responsive, and user-friendly **Single-Page Application (SPA)** that connects to the backend APIs for real-time calculations and history management.

---

## Main Features:
- Modern Calculator UI with a clean and dark-themed design
- Support for Basic Operations (+, -, *, /)
- Support for Advanced Operations (√, %, ^, +/-)
- Auto-switch between Basic and Advanced backend services based on the user’s calculation
- History Display: View the latest 10 calculations
- Fullscreen Mode toggle
- Dynamic Feature Toggle: History saving and loading controlled by backend feature flags
- Smart Expression Handling: Automatically transforms expressions for backend compatibility (e.g., % ➔ /100*)

---

## Technologies Used:
| Technology | Purpose |
|:---|:---|
| Angular 17 | Frontend framework |
| RxJS | Manage async API calls |
| Angular Forms | Bind input and form controls |
| Standalone Components | Lightweight modular structure |
| Nginx | Serve the Angular app in production |

---

## Deployment:
- Built using **Docker** and served via **Nginx** inside the frontend container.
- Configured to proxy API requests:
  - `/basicCalculator/` ➔ Basic Calculator Backend
  - `/advancedCalculator/` ➔ Advanced Calculator Backend
- Optimized with:
  - Gzip compression for faster loading
  - Static files caching for better performance
  - Cross-Origin Resource Sharing (CORS) support

---

## Folder Structure:
```bash
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── calculator/      # Main Calculator UI component
│   │   ├── services/
│   │   │   ├── basic-calculator.service.ts
│   │   │   └── advanced-calculator.service.ts
│   ├── assets/                  # Images, icons, etc.
├── nginx.conf                    # Custom Nginx configuration
├── Dockerfile                    # Build Angular frontend and serve with Nginx
├── package.json                  # Project dependencies
```

---

## UI Highlights:
- Dark mode by default
- Responsive design (works well on mobile and desktop)
- Clear / History / Fullscreen top buttons for better UX
- Big display area showing current expression and result
- Friendly errors for invalid expressions or server errors

---

## How Frontend Talks to Backend:
- Angular app sends requests directly to **Nginx**
- Nginx proxies API calls to the correct backend microservice

This architecture **separates UI from API** securely and cleanly.

---
