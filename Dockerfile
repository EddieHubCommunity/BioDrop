# Use the official Node.js v16 image as the base image for the container
FROM node:16

# Add a label to the image with the source code repository URL
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/LinkFree

# Set the working directory for the following commands
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container's working directory
COPY package*.json ./

# Define an argument NODE_ENV that can be passed during the build process
ARG NODE_ENV

# Install dependencies and ignore dev dependencies and scripts if NODE_ENV is set to production
RUN if [ "$NODE_ENV" = "development" ]; then npm install --ignore-scripts; else npm install  --omit=dev --ignore-scripts; fi

# Copy all files from the host directory to the container's working directory
COPY . .

# Update the app.json file with the version number from package.json
RUN sed -i 's/0.0.0/'`npm pkg get version | tr -d '"'`'/g' config/app.json

# Build the Node.js application
RUN npm run build

# Set the default command to run when the container starts to npm start
CMD ["npm", "start"]
