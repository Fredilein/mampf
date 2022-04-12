# Express API

This is the code for the backend, which will run on the server. The client accesses data (e.g. recipes) by sending requests to this part.
Requests will be parsed according to the code in `routes/` and will be delegated to the corresponding functions in `controllers/`.

## Folders

### `models`

Contains definitions of a recipe and user.

### `routes`

Contains definitions of routes used to access functions in controller.

### `controllers`

Contains functions to load recipes/user/... from database.
