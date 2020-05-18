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

# Endpoints

## Bubbles

### URL

https://earthdash.herokuapp.com/api/bubbles

### Description

Returns the name and total confirmed cases for each country.

### Schema

```typescript
{
	"country": string,
	"totalConfirmed": number
}[]
```

### SQL

```SQL
SELECT country, totalconfirmed AS totalConfirmed FROM summary WHERE totalconfirmed > 0
```

## Heatmap

### URL

https://earthdash.herokuapp.com/api/cases

### Description

Returns the latitude, longitude, number of confirmed cases, and date for each day and a set of all dates.

### Schema

```typescript
{
	"cases": {
		"lat": number,
		"lon": number,
		"cases": number,
		"date": string ("MM/dd/yy")
	}[],
	"dates": string ("MM/dd/yy")[]
}
```

### SQL

```SQL
SELECT lat, lon, cases::int, to_char(date, 'MM-dd-yy') AS date FROM "uscounties" WHERE EXISTS (SELECT lat, lon, cases, date WHERE cases > 0) ORDER BY date ASC
```

## Air Quality

### URL

https://earthdash.herokuapp.com/api/air

### Description

Returns a set of all dates, the date and daily dean PM2.5 concentration for each day, and the date and number of cases for each day. Data is only used for dates shared between both the cases and air quality data.

### Schema

```typescript
{
	"dates": string ("M/d/yyyy")[],
	"airQuality": {
		"x": string ("M/d/yyyy"),
		"y": number
	}[],
	"cases": {
		"x": string ("M/d/yyyy"),
		"y": number
	}[]
}
```

### Datasources

- la_glendora_ppm.csv
- latimes-la-totals.csv

## Racing Bar Graph

### URL

https://earthdash.herokuapp.com/api/deaths

### Description

Returns the name and number of deaths for the top 20 countries ranked by deaths for each day.

### Schema

```typescript
{
	"country": string,
	"date": date,
	"deaths": string
}[]
```

### SQL

```SQL
SELECT ranked_countries.country, ranked_countries.date, sum(ranked_countries.deaths) AS deaths FROM (SELECT covidall.country, covidall.date, covidall.deaths, rank() OVER (PARTITION BY covidall.date ORDER BY covidall.deaths DESC) FROM covidall WHERE province = '' OR country = 'China') ranked_countries WHERE rank <=20 AND deaths > 0 GROUP BY ranked_countries.date, ranked_countries.country ORDER BY ranked_countries.date"
```

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
