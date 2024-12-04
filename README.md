## Requirements

- Python (>=3.10)
- Virtual environment manager (venv, virtualenv, conda...)
- Node JS


## Install Node JS using Node Version Manager (NVM)
```bash
# From https://nodejs.org/en/download/package-manager

# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 22

# verifies the right Node.js version is in the environment
node -v # should print `v22.12.0`

# verifies the right npm version is in the environment
npm -v # should print `10.9.0`
```


## Create a Vite project
```bash
# create vite app
npm create vite@latest frontend  # then in prompt choose vanilla js or whatever fits your needs
```

```bash
# install required basic dependencies
npm i --save-dev vite
```


## Install bootstrap on vite

https://getbootstrap.com/docs/5.2/getting-started/vite/


```bash
# Install Bootstrap
npm i --save bootstrap @popperjs/core
```

```bash
# Install additional dependency. 
npm i --save-dev sass
```