# Generador Dom

## Documentation

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Structure](#structure)

## 💾Installation

```bash
composer require konekt/menu
```

## ▶️Getting Started

You can define the menus in a service provider's boot method, so any request hits your
application, the menu objects will be available.

## 📂Structure
```
Vtiger-Webservices-curl/
├── controller/
│  └──VtApiClasses/
│     └──Operations/
│        ├──crm_crudoperation.php
│     └──Webservices/
│        ├──crm_auth.php
│        ├──crm_webservice.php
├── model/
│  constant.php
├── View/
│  ├──index.php
│  ├──create.php
│  ├──read.php
│  ├──update.php
│  ├──delete.php
├── .gitignore.swp
├── .README.md
├── .LICENSE.md
