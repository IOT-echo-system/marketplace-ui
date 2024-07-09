FROM node:21.7-alpine
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
COPY public ./public
COPY .next ./.next
COPY node_modules ./node_modules
COPY package.json ./package.json
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
