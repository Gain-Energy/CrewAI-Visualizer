# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install Python and build dependencies first
RUN apk add --no-cache python3 make g++ gcc python3-dev

COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create GraphQL queries file with proper formatting
RUN echo 'import { gql } from "@apollo/client";\n\
\n\
export const GET_AGENTS = gql`\n\
  query {\n\
    agents {\n\
      id\n\
      name\n\
      role\n\
      goal\n\
      backstory\n\
    }\n\
  }\n\
`;\n\
\n\
export const GET_MISSIONS = gql`\n\
  query {\n\
    missions {\n\
      id\n\
      name\n\
      description\n\
    }\n\
  }\n\
`;\n\
\n\
export const UPDATE_AGENT = gql`\n\
  mutation($id: ID!, $input: AgentInput!) {\n\
    updateAgent(id: $id, input: $input) {\n\
      id\n\
    }\n\
  }\n\
`;\n\
\n\
export const DELETE_AGENT = gql`\n\
  mutation($id: ID!) {\n\
    deleteAgent(id: $id)\n\
  }\n\
`;\n\
\n\
export const CREATE_AGENT = gql`\n\
  mutation($input: AgentInput!) {\n\
    createAgent(input: $input) {\n\
      id\n\
    }\n\
  }\n\
`;\n\
\n\
export const UPDATE_MISSION = gql`\n\
  mutation($id: ID!, $input: MissionInput!) {\n\
    updateMission(id: $id, input: $input) {\n\
      id\n\
    }\n\
  }\n\
`;\n\
\n\
export const RUN_MISSION = gql`\n\
  mutation($id: ID!) {\n\
    runMission(id: $id)\n\
  }\n\
`;\n\
\n\
export const DELETE_MISSION = gql`\n\
  mutation($id: ID!) {\n\
    deleteMission(id: $id)\n\
  }\n\
`;\n\
\n\
export const CREATE_MISSION = gql`\n\
  mutation($input: MissionInput!) {\n\
    createMission(input: $input) {\n\
      id\n\
    }\n\
  }\n\
`;' > src/utils/graphql_queries.ts

# Create next.config.mjs with proper formatting
RUN printf '%s\n' \
    '/** @type {import("next").NextConfig} */' \
    'const nextConfig = {' \
    '  eslint: {' \
    '    ignoreDuringBuilds: true' \
    '  },' \
    '  images: {' \
    '    unoptimized: true' \
    '  }' \
    '};' \
    '' \
    'export default nextConfig;' > next.config.mjs

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