#------------------------- STAGE 1 ----------------------#

# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]