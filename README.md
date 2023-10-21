# teste-cumbuca
Repo for Cumbuca test for Software Developer

## Features
- [x] Register
- [x] Authentication 
- [x] Authorization
- [x] Deposit
- [x] Transfer
- [x] Withdraw
- [x] Refund
- [x] Snapshot of wallet funds
- [x] List snapshots
- [x] Rollback Wallets based on a snapshot
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
- **Refund:**
  - **transaction** should be a transaction of type `transfer` and not have a status of `refunded`
