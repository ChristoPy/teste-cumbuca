# teste-cumbuca
Repo for Cumbuca test for Software Developer

## Features
- [x] Register
- [x] Authentication 
- [x] Authorization
- [x] Deposit
- [ ] Transfer
- [x] Withdraw
- [ ] Snapshot of wallet funds
- [ ] Rollback Wallets
- [x] List Transactions

## Tech stack
- Fastify
- MongoDB
- Redis
- Bull
- TypeScript
- NodeJS

## Business rules
- **Register:**
  - **full name**, **email**, **password** and **taxId** are required
  - **email** or **taxId** cannot be used by another user
- **Authentication:**
  - the credentials must be right
  - a token is generated and can't be forged
- **Withdraw:**
  - can't withdraw if the amount is larger than the wallet funds
- **List Transactions:**
  - **startDate** and **endDate** should be valid dates
  - **startDate** should come first than **endDate**
