#!/bin/bash

# install dependencies
npm install

# init prisma
npx prisma generate

# init migrations
npx prisma migrate dev --name init

exec "$@"