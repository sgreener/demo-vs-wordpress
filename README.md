# SV interview tech challenge

## Overview

This should be a bunch of Automated Tests using Playwright to run against the included docker image and its data.

> Note: .spec files that have a (f) are functional tests and (nf) are none functional

## About

This repo is built using...

- Typescript
- Playwright
- PNPM (package manager replacement for npm)
- Node.js (version 16+)
- Git
- Docker (desktop)
- VSCode

> Note: You will need to install some of these before you can use this repo. Time too short to tell you what and how to do it!.

## Setup steps

This was done built on a Windows machine, install instructions for other systems have not been included.


1. Clone this repo to a local folder and navigate to that folder in a command windows


2. Install the required dependencies by executing the following in a cmd prompt
```cmd
pnpm install
pnpm exec playwright install
```

3. Start docker image
```cmd
docker-compose up -d
```

4. Restore wordpress database from backup (put some test data in)
```cmd
cat db_backup.sql | docker exec -i sv_mysql /usr/bin/mysql -u root --password=rootpw svdb
```

5. Open the project in VSCode
```cmd
code .
```

6. Add a .env file to the root of the repo and populate with the following values
```ini
# This is the url the tests will be run against
BASE_URL = "http://localhost:8080/wp-admin/"

# Credentials
ADMIN_USERNAME = "overlord"
ADMIN_PASSWORD = "overlordpw"

# run them headless or not
HEADLESS=false

# "console", "1" , "PW:API" - if console will stop headless
PWDEBUG=
SLOWMO=
```

7. Now you can execute tests...
    - Using the labs tab in vscode
    - Using the launch option to run current file (if you have a spec file selected)
    - To run against all browsers you can use `npx playwright test` followed by `npx playwright show-report` to see the report


---
## Docker related notes

To start this docker image up perform

``` cmd
docker-compose up -d
```

To see current running docker containers
``` cmd
docker container ls
```

To see detailed information about a docker container
``` cmd
docker inspect <container-name>
```

To get the ip address of the container
```cmd
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sv_mysql
```


back up the database
```cmd
docker exec sv_mysql /usr/bin/mysqldump -u root --password=rootpw --no-tablespaces svdb > db_backup.sql
```


restore the database
```cmd
cat db_backup.sql | docker exec -i sv_mysql /usr/bin/mysql -u root --password=rootpw svdb
```


