# URLShortener

## Current build steps:

Use the following build steps in an environment configured to run Docker.

```
git clone `https://github.com/F3rgz/URLShortener.git`
docker-compose -f docker-compose.yml build
docker-compose up -d
```

## Steps to run the unit tests

```
npm run test
```

## Steps to test

- Navigate to `localhost:3000` to view the main page.
  - Here you will see instruction on how to use this API.
- Try out the sample URL here to generate a shortened URL:
  > `http://localhost:3000/shorten?url=https://www.linkedin.com/in/fergal-eccles-4b5307b8/`
- The API should respond with your shortened URL:
  > `localhost:3000/9837c`
- Enter this URL into a new tab and you should be redirected to the origin LinkedIn address.
