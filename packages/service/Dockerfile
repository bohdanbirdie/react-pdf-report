FROM node:12-slim

ARG NPM_TOKEN  

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /var/app

COPY yarn.lock .
COPY package.json .
RUN yarn cache clean
RUN yarn install --force

COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY src/ src/
COPY .eslintrc.js .eslintrc.js
COPY .prettierrc .prettierrc

RUN yarn build

EXPOSE 5000

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser ./node_modules/puppeteer

USER pptruser

CMD ["node", "dist/main"]
