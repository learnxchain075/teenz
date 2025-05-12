# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the frontend code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "start"]
