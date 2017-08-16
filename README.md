# cli-tube

Simplest wrapper to execute shell commands via HTTP. To be used as internal medium only, **with pre-validated inputs.**

## Running

The HTTP port gets pulled from the `PORT` environment variable, and `3000` is used as default.

### Development

`gulp` (has live reload enabled on _*.js_ and _*.json_ files)

### "Production"

`npm start`

---

## Usage

### Endpoints

+ **GET** `/` - To be used for healthchecks, replies with HTTP code **200**.
+ **POST** `/cmd` - Execute a command and return its output, can return codes **200** _(command has succeeded)_, **400** _(bad command input)_, **500** _(the command has failed and/or something bad has happened)_.

All replies will be JSON-encoded. Errors and generic messages will have the following schema:

```json
{
  "message": "",
  "error": {},
}
```

#### `/cmd`

Executes a command in a spawned shell (output redirects, file globbings, etc. will work correctly). Accepts `application/x-www-form-urlencoded` data:

| Field | Type   | Meaning                                                                                                   | Example                        |
|-------|--------|-----------------------------------------------------------------------------------------------------------|--------------------------------|
| cmd   | _string_ | The command to execute. | `echo "This goes to stderr" >&2` |

Will reply with the following schema:

```json
{
  "err": {},
  "stdout": "",
  "stderr": ""
}
```