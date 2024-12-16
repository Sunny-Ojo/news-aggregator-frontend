# Use a lightweight Node.js 20 image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose the development port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
