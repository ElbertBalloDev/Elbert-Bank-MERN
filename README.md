A current working version can be found on https://elberts-bank.herokuapp.com/

User email: user@gmail.com
password: password 

Full-stack banking web app built with Plaid's API and the MERN stack.
This project uses the following technologies:
React and React Router for the frontend
Express and Node for the backend
MongoDB for the database
Redux for global state management
Plaid for bank account linkage and transaction data
Passport and JWTs for authentication
Our app will allow users to
- Register
- Log in
- Access protected pages only accessible to logged in users
- Stay logged in when they close the app or refresh the page
- Log out
- Link multiple bank accounts
- Remove bank accounts
- View transactions from all linked accounts in a searchable and filterable data table


Please Change these files to work with the Plaid API and mongodb
Server Side
routes > api > plaid
Change change your credentials for plaid from line 10 - 12

config > keys.js 
On the keys.js file change the mongoURI to your connection string
