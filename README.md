# vidly
A Nodejs API migrated with MongoDB for renting movies online.


## Endpoints
| HTTP verbs | Paths  | Used for |
| ---------- | ------ | --------:|
| GET | /api/genres | List all genres sorted by name |
| POST | /api/genres | Create a new genre |
| PUT | /api/genres/:id  | Update a genre |
| GET | /api/genres/:id    | Show a genre |
| DELETE | /api/genres/:id | Delete a genre |
| GET | /api/customers | List all customers sorted by name |
| POST | /api/customers | Create a customer |
| PUT | /api/customers/:id | Update a customer |
| GET | /api/customers/:id | Show single customer|
| DELETE | /api/customers/:id | Delete single customer |
| GET | /api/rentals | List all rentals sorted by dateOut |
| POST | /api/rentals | Create a new rental |
| GET | /api/users/me | Show current user |
| POST | /api/users | Create a user |
| POST | /api/auth | Authenticate a user |
