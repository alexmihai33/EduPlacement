# Stage 1: Build the React app
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the entire app source code
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the Vite app with a Node.js server
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy the built app
COPY --from=build /app/dist ./dist

# Expose port 3000 for the server
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]