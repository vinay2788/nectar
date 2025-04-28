FROM ubuntu:20.04

# Avoids interactive dialog during apt installs
ENV DEBIAN_FRONTEND=noninteractive

# Set environment for NVM and Node.js
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

# Install required tools and FFmpeg 6
RUN apt-get update && \
    apt-get install -y \
        curl \
        wget \
        gnupg2 \
        software-properties-common \
        ca-certificates && \
   # add-apt-repository ppa:savoury1/ffmpeg6 -y && \
    apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Install NVM and Node.js 18
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
    bash -c ". $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION"

# Set working directory
WORKDIR /app

# Copy package.json files first for caching
COPY package*.json ./

# Install node modules in production
RUN bash -c ". $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && npm ci --only=production"

# Copy rest of the source
COPY . .

# Build the app
RUN bash -c ". $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && npm run build"

# Expose port (used by Next.js or Express app)
EXPOSE 3000

# Run the app
ENV NODE_ENV=production
CMD ["/bin/bash", "-c", ". $NVM_DIR/nvm.sh && nvm use $NODE_VERSION && npm run start"]

