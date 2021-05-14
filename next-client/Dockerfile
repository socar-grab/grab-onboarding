FROM node:12.2.0
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]
