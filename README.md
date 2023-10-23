# teste-cumbuca
Repo for Cumbuca test for Software Developer  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/5947775-4ef4ea91-3346-431a-92e7-271abe771cab?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D5947775-4ef4ea91-3346-431a-92e7-271abe771cab%26entityType%3Dcollection%26workspaceId%3Da37de996-d57f-4b97-bc19-edeabe221492)

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
- **Rollback Transactions:**
  - **snapshot** should exist and all wallets that where snapshotted will be reversed to that point in time
