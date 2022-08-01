Prerequisite

- [nodejs](https://nodejs.org/en/)
- [vscode](https://code.visualstudio.com/)
- [docker](https://www.docker.com/products/docker-desktop)
- [azure-cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [git](https://git-scm.com/)

Quick start

- clone repo which contains the Dockerfile you want in Codiac

- open vscode in root directory

- open terminal: ctrl + `

- run cmd: npm i -g @codiac.io/codiac-cli

- run cmd: az login

  - you must be added to the subscription prior to running

- run cmd: az account set --subscription [Your Subcription ID]

- run cmd: codiac noc:cluster:create 
  - [Cluster name] 
  - [Codiac Acct ID]
  - [Your Azure Subcription ID] 
  - [Cluster resource group name] 
  - [Datacenter location e.g. 'UK West'] 
  - [Node type e.g. 'Standard_DS2_v2'] 
  - [Node count e.g. 2]
  - [subnet is optional]
  - [service principal creds are optional]
    - If none provided Codiac will atempt to create one.
    - Ensure you have AAD user admin permissions if you want Codiac to create the service principal
- run cmd: codiac noc:cluster:init
- run cmd: codiac login
- run cmd: codiac asset:create
- run cmd: codiac cabinet:create
- run cmd: codiac build
- run cmd: codiac publish
- run cmd: codiac deploy
- run cmd: codiac portal
