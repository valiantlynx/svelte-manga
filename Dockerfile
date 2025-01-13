# Base image for all stages
FROM node:23-alpine AS base

# Common dependencies for all stages
RUN apk add --no-cache libc6-compat && apk update

# Development stage
FROM ubuntu:20.04 AS dev

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies, including sudo
RUN apt-get update && apt-get install -y \
    curl \
    git \
    sudo \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
COPY . .

RUN npm install --global yarn
RUN yarn install

# Install Neovim dependencies
RUN curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz
RUN sudo rm -rf /opt/nvim
RUN sudo tar -C /opt -xzf nvim-linux64.tar.gz
RUN echo 'export PATH="$PATH:/opt/nvim-linux64/bin"' >> ~/.bashrc
RUN chmod +x ~/.bashrc
RUN ~/.bashrc
RUN git clone https://github.com/nvim-lua/kickstart.nvim.git "${XDG_CONFIG_HOME:-$HOME/.config}"/nvim

EXPOSE 3000 5173 5174 4173

CMD ["yarn", "dev", "--", "--host"]

# Monorepo build stage
FROM base AS builder-mono
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune svelte-manga --docker

# Monorepo install dependencies
FROM base AS installer-mono
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder-mono /app/out/json/ .
COPY --from=builder-mono /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Monorepo build project
COPY --from=builder-mono /app/out/full/ .
COPY turbo.json turbo.json
RUN DEPLOY_TARGET=node NODE_OPTIONS="--max-old-space-size=8192" yarn turbo run build --filter=svelte-manga --concurrency 2

# Solo build stage
FROM base AS builder-solo
WORKDIR /app
COPY . .
RUN yarn install
RUN DEPLOY_TARGET=node yarn build

# Runner stage
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 svelte
USER svelte

# Production monorepo
FROM runner AS runner-mono
COPY --from=installer-mono /app/apps/svelte-manga/package.json .
COPY --from=installer-mono /app/apps/svelte-manga/build /app/build
EXPOSE 3000
CMD [ "node", "build" ]

# Solo deployment
FROM runner AS runner-solo
COPY --from=builder-solo /app/package.json .
COPY --from=builder-solo /app/.env .
COPY --from=builder-solo /app/build /app/build
EXPOSE 3000
ENV PUBLIC_IMAGE_URL="https://www.manganelo.cc"
ENV PUBLIC_GH_P="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"
ENV PUBLIC_GH_URL="https://api.github.com/repos/valiantlynx/valiantlynx-turborepo/issues"
CMD [ "node", "build" ]
