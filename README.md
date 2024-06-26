# Ort Social Hub

A simple social network built with React Native.

### Colaborators

- Ernesto Dainesi
- Owen Donnenfeld
- Joaquin Darquier
- Martin Matthew Steele MC crea

### Starting app

After cloning this repository, you can run the app with:

```bash
npm i
npm run start
```

Then, you will need to start our server, [clone this other repository](https://github.com/ErneDainesi/OrtSocialHubServer).
And follow its instructions.

### Security

We've added some security measures to make our app a safe one.

- Password encryption using bcrypt. (In the server).
- Correct error messages when user tries to login with invalid credentials.
- Prompt to accept terms and conditions when registering.
- Users must choose a password with at leaste 12 characters, 1 uppercase letter and a simbol.
- Use of enviromental variables to avoid exposing passwords, api keys or database credentials.
- Use of Json Web Token to maintain user session and avoid vulnerabilities. (In the server).
