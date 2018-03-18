# Uni Bremen Mensa API
This is an API that scrapes the Studentenwerk Bremen website and returns the foodplan as JSON.

### Endpoints

#### / - Root Endpoint
Returns the foodplan of today (or Monday if asked on the weekend).

#### /:day - Endpoint
Returns the foodplan of the day :day's after today. So mensa.legacymode.de/api/1 will return the foodplan of tuesday if it is monday.

### Roadmap

#### Get all Endpoint
Returns all available foodplans from the website in one JSON.

#### Caching
Save the Data so the website will not be scraped on each request.

#### Refactor
The code has to be refactored, it is messy.

### Contribution
If you want to Contribute just send a Pull request or write me an email.

### Demo
The API is online at _https://mensa.legacymo.de/api/_.
