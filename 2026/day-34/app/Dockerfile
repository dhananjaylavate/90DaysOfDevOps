FROM node:18-slim

# Create a working directory for an app inside a container
WORKDIR /app

# Copy package management manifests first to optimize layer caching
COPY package*.json ./

RUN npm install --production

# Copy application source code

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]


