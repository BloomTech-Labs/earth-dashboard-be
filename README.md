[![Maintainability](https://api.codeclimate.com/v1/badges/cef5bd3f4055b7fe79ab/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/earth-dashboard-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cef5bd3f4055b7fe79ab/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/earth-dashboard-be/test_coverage)
[![Heroku CI Status](https://hbadge.herokuapp.com/last.svg)](https://dashboard.heroku.com/pipelines/2f497cf1-a506-4b6b-9415-d364b1f30a8c/tests)

# API Documentation

#### Backend delpoyed at [Heroku](https://earthdash.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test:dev** to start server using testing environment

### Express framework

- Helps to create server-side applications faster & smarter
- Has the largest community of all Node.js frameworks
- It is the most mature of all Node.js frameworks
- It is extremely minimalist

## Endpoints

#### Visualization Routes

| Method | Endpoint       | Access Control | Description                                                |
| ------ | -------------- | -------------- | ---------------------------------------------------------- |
| GET    | `/api/bubbles` | all users      | Returns all data needed for the bubbles visualization.     |
| GET    | `/api/cases`   | all users      | Returns all data needed for the cases map.                 |
| GET    | `/api/air`     | all users      | Returns all data needed for the air quality visualization. |
| GET    | `/api/deaths`  | all users      | Returns all data needed for the racing bar graph.          |

#### Misc Routes

| Method | Endpoint | Access Control | Description                    |
| ------ | -------- | -------------- | ------------------------------ |
| GET    | `/api`   | all users      | Returns an API status message. |

## Actions

`queryMapData()` -> Returns the latitude, longitude, and number of cases for every location for all dates
`querySummary()` -> Returns the name and total confirmed cases for each country

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

\*PROD_DB_URL - URL of database deployed on AWS

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/earth-dashboard-fe) for details on the fronend of our project.
See [DS Documentation](https://github.com/Lambda-School-Labs/earth-dashboard-ds/) for details on the data science backend.
