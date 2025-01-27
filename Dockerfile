# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install Python and build dependencies first
RUN apk add --no-cache python3 make g++ gcc python3-dev

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Python dependencies stage
FROM python:3.11-slim AS python-deps
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install Python and required packages
RUN apk add --no-cache python3 py3-pip make g++

# Copy built assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy Python dependencies
COPY --from=python-deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy necessary files
COPY prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]