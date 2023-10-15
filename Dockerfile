FROM node:18.18.0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN pnpm install

RUN pnpm run build

CMD ["pnpm", "start:dev"]