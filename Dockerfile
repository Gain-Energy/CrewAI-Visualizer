# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install Python and build dependencies first
RUN apk add --no-cache python3 make g++ gcc python3-dev

COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create GraphQL queries file if it doesn't exist
RUN mkdir -p src/utils && touch src/utils/graphql_queries.ts && \
    echo 'import { gql } from "@apollo/client";

export const GET_AGENTS = gql`query { agents { id name role goal backstory } }`;
export const GET_MISSIONS = gql`query { missions { id name description } }`;
export const UPDATE_AGENT = gql`mutation($id: ID!, $input: AgentInput!) { updateAgent(id: $id, input: $input) { id } }`;
export const DELETE_AGENT = gql`mutation($id: ID!) { deleteAgent(id: $id) }`;
export const CREATE_AGENT = gql`mutation($input: AgentInput!) { createAgent(input: $input) { id } }`;
export const UPDATE_MISSION = gql`mutation($id: ID!, $input: MissionInput!) { updateMission(id: $id, input: $input) { id } }`;
export const RUN_MISSION = gql`mutation($id: ID!) { runMission(id: $id) }`;
export const DELETE_MISSION = gql`mutation($id: ID!) { deleteMission(id: $id) }`;
export const CREATE_MISSION = gql`mutation($input: MissionInput!) { createMission(input: $input) { id } }`;' > src/utils/graphql_queries.ts

# Create next.config.mjs with proper formatting
RUN echo 'const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;' > next.config.mjs

# Build the application
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