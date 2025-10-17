FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

# Copy remaining source code
COPY . .

# Expose backend port
EXPOSE 4000

# Run server
CMD ["node", "src/server.js"]
