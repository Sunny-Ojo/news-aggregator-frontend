# Use a lightweight Node.js 20 image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy .env.example to .env
RUN cp .env.example .env

# Expose the development port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
