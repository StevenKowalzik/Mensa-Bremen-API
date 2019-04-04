# Uni Bremen Mensa API
This is an API that scrapes the Studentenwerk Bremen website and returns the foodplan as JSON.

### Endpoints

#### / - Root Endpoint
Returns the foodplan of today and the following 4 days.

#### /:day - Endpoint
Returns the foodplan of the day :day's after today. So mensa.legacymode.de/api/0 will return todays plan, while mensa.legacymode.de/api/1 will return the foodplan of the day after. Weekends will be skipped in this numeration.

### Roadmap

### Contribution
If you want to Contribute just send a Pull request or write me an email.

### Demo
The API is online at _https://legacymo.de/v2/api/_.
