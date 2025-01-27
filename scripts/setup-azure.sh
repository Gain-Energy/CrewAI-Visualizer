#!/bin/bash

# Variables
RG_NAME="crewai-visualizer-rg"
LOCATION="eastus"
ACR_NAME="crewairegistry$(openssl rand -hex 4)"
APP_NAME="crewai-visualizer"
POSTGRES_NAME="crewai-db-$(openssl rand -hex 4)"

# Create Resource Group
az group create --name $RG_NAME --location $LOCATION

# Create Azure Container Registry
az acr create \
  --resource-group $RG_NAME \
  --name $ACR_NAME \
  --sku Basic \
  --admin-enabled true

# Create PostgreSQL Flexible Server
az postgres flexible-server create \
  --resource-group $RG_NAME \
  --name $POSTGRES_NAME \
  --location $LOCATION \
  --admin-user crewai_admin \
  --admin-password "$(openssl rand -base64 16)" \
  --sku-name Standard_B1ms

# Create Container Apps Environment
az containerapp env create \
  --name "crewai-env" \
  --resource-group $RG_NAME \
  --location $LOCATION