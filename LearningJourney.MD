## Creating an Entity
1. Create an entity file, create a class and its methods
2. Connect entity to parent module so it creates repository
3. Connect entity to root connection (`AppModule`)

## Generating files
There are way to generate file and tell the cli to put it where it should be without creating a new directory using `--flat` flag

## Setup for different environment
1. Install several dependencies first
```
npm i -S @nestjs/config
```
2. Create `.env.development` and `.env.test`

---

# Learning Authorization
Learn authorization through the official documentation of NestJS.
[Authorization](https://docs.nestjs.com/security/authorization)