FROM node:16.16.0 AS development

# Create app directory (in container/image)
WORKDIR /trello-like-back/src/app

# Install app dependencies
COPY . .

ARG STAGE=dev
ENV STAGE=${STAGE}

RUN npm install
RUN npm run build

EXPOSE 3000


FROM node:16.16.0 AS production

ARG STAGE=prod
ENV STAGE=${STAGE}

# Create app directory (in container/image)
WORKDIR /trello-like-back/src/app

COPY --from=development /trello-like-back/src/app/ .

EXPOSE 3000
CMD [ "node", "dist/main" ]
