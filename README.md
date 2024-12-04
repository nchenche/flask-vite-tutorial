# **Flask + Vite Web Application Tutorial**

This project is a tutorial demonstrating how to build a simple web application by integrating a **Flask** backend with a **Vite** frontend using **Vanilla JavaScript**. The tutorial covers setting up the development environment, creating the backend API, and designing the frontend with dynamic interaction.

---


## **Getting Started**


### **Requirements**

To run this project, ensure the following software is installed:

- **Python** (>=3.10)
- **Virtual Environment Manager** (e.g., `venv`, `virtualenv`, `conda`, etc.)
- **Node.js** (via Node Version Manager - NVM)

#### **Install Node.js Using Node Version Manager (NVM)**

Follow these steps to install and configure Node.js:

```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Install the latest Node.js version
nvm install 22

# Verify Node.js version
node -v  # Output: v22.x.x

# Verify npm version
npm -v   # Output: 10.x.x
```
---

### **Clone the Repository**

```bash
git clone https://github.com/nchenche/flask-vite-tutorial.git
cd flask-vite-tutorial
```
---

### Set Up the Backend

1. Navigate to the backend directory

```bash
cd backend
```

2. Set Up a virtual environment:


```bash
# Other tools than venv could be used (virtualenv, conda...)
python -m venv venv
source venv/bin/activate
```

3. Install the flask project

```bash
# Install the Flask project (in editable mode with -e):
pip install -e .
```

4. Run the application

```bash
# The backend server will start on http://127.0.0.1:5000
python wsgi.py
```
---

### Set Up the Backend

1. Navigate to the frontend directory

```bash
cd frontend
```

2. Install Node.js dependencies:


```bash
npm install
```

4. Start the Vite development server

```bash
# The frontend server will start on http://127.0.0.1:5173
npm run dev
```
---


## **Project Structure**

```plaintext
.
├── backend/                 # Backend application using Flask
│   ├── app/                 # Flask app module
│   ├── README.md            # Backend-specific instructions
│   ├── requirements.txt     # Python dependencies
│   ├── setup.py             # Backend package setup
│   ├── VERSION              # Backend version information
│   └── wsgi.py              # WSGI entry point for the Flask app
├── frontend/                # Frontend application using Vite
│   ├── index.html           # Main entry point
│   ├── node_modules/        # Node.js dependencies (excluded in .gitignore)
│   ├── package.json         # Frontend dependencies
│   ├── package-lock.json    # Locked dependency versions
│   ├── public/              # Public assets
│   ├── src/                 # Frontend source code
│   └── vite.config.js       # Vite configuration
└── README.md                # Root README with setup instructions
```


<br>
<br>
<br>

# Starting from scratch 

-- WORK IN PROGRESS --


## **Set Up The Frontend**

### Create a Vite Project

Use Vite to scaffold the frontend application:

```bash
# Create a Vite app project named 'frontend'
npm create vite@latest frontend
# Follow prompts and choose 'vanilla' for plain JavaScript
```

```bash
# Go to the frontend/ directory
cd frontend

# Install Vite as a development dependency:
npm i --save-dev vite
```

### Bootstrap in Vite

To integrate Bootstrap with the Vite project, follow these steps:

1. Install Bootstrap and Popper.js 

```bash
# Install Bootstrap and Popper.js
npm i --save bootstrap @popperjs/core
```

2. Install Sass (for SCSS support in Bootstrap):

```bash
# Install Sass as a development dependency
npm i --save-dev sass
```

3. Create a `vite.config.js` file to create an alias for Bootstrap: 

```js
// vite.config.js (at the root of the Vite project, where node_modules directory is)
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
});
```

4. Configure Bootstrap in Your Project:

```js
// Create src/scss/styles.scss and add:
@import "~bootstrap/scss/bootstrap";
```

```js
// Import your custom styles and Bootstrap's JavaScript in the main JavaScript file
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
```

For additional details., refer to [Bootstrap's Vite Setup Guide](https://getbootstrap.com/docs/5.2/getting-started/vite/).



## **Set Up The Backend**

### Create a Flask Project

1. Set Up a Virtual Environment:

```bash
# Other tools than venv could be used (virtualenv, conda...)
python -m venv venv
source venv/bin/activate
```

```bash
# Install the Flask project (in editable mode with -e):
pip install -e .
```

## **Run the Full Application**

1. Start the backend server

```bash
# Navigate to the backend directory
cd backend/

# Activate the virtual environment
source venv/bin/activate

# Start Flask
python wsgi.py
```

1. Start the backend server

```bash
# Navigate to the frontend directory
cd frontend

# Start the Vite development server
npm run dev
```



