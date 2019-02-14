.
├── common
│   ├── com_definition.go
│   ├── common.go
│   ├── compare.go
│   └── compare_test.go
├── config
│   └── config.go
├── core
│   ├── errors
│   │   ├── errors.go
│   │   ├── errors_test.go
│   │   ├── reporter.go
│   │   └── reporter_test.go
│   ├── jwt
│   │   └── jwt.go
│   └── mongo
│       ├── Increment.go
│       ├── db.go
│       └── db_test.go
├── key_sources
│   ├── private_key
│   └── public_key.pub
├── model
│   ├── app_version.go
│   ├── application.go
│   ├── login.go
│   ├── model_func.go
│   ├── model_test.go
│   ├── response.go
│   ├── role.go
│   ├── user.go
│   └── user_role.go
└── server
    ├── handler
    │   ├── app_handler.go
    │   ├── app_version_handler.go
    │   ├── file_handler.go
    │   ├── html_handler.go
    │   ├── index.go
    │   ├── para_model.go
    │   ├── router.go
    │   └── user_handler.go
    ├── middleware
    │   ├── authentication.go
    │   ├── cookie.go
    │   └── logger.go
    ├── server.go
    └── web_server.go

11 directories, 37 files
