# React-authentication

# LIVE HERE : https://react-authentication-1v0.web.app/

React-authentication is a react web authentication application using firebase authentication api and authentication tokens approach with React JS / TypeScript / Redux Toolkit / Firebase Authentication / AWS Lambda for backend / Cypress / Prime React / React router dom V6 / CSS / ESLint.

I developed the backend in an AWS Lambda function to store the API_KEY and call the firebase API safely with the help of API GATEWAY to expose the endpoints, limit the requests and restrict the CORS policy and i also used CloudWatch to track logs.
For the deployement I built the project with the `yarn build` commande and I deployed with Firebase, here the documentation for hosting and deploying your app in Firebase : https://firebase.google.com/docs/hosting/quickstart.

![image](https://user-images.githubusercontent.com/52780772/161967255-e10f5c4e-4b5e-4a57-b3cf-0cd1a899caf5.png)

## How to run

### Install Node.js plateform

( Choose the LTS version recommanded for most users )

In the project directory, you can run:

### `npm install --global yarn`

to install the yarn package, it's an alternative of npm.

### `yarn install`

To install all dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### You can start using the application with all its features :)

![image](https://user-images.githubusercontent.com/52780772/161967489-ccd6a0ad-c8b3-4ebf-8947-e6a8f7b6d9b4.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn cypress`

To Launche the cypress desktop app built with Electron but before you need to have the app started with "yarn start" in an other terminal.

### `yarn build`

Builds the app for production to the `build` folder without SOURCEMAP.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
