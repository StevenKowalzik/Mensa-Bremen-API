# Uni Bremen Mensa API



This is an API that scrapes the Studentenwerk Bremen website and returns the foodplan as JSON. 

*Since im not actively studying at the University of Bremen anymore feel free to message me about helping or maintaining this project.*

### Endpoints

#### / - Root Endpoint
Returns the foodplan of today and the following 4 days.

#### /:day - Endpoint
Returns the foodplan of the day :day's after today. So mensa.legacymode.de/api/0 will return todays plan, while mensa.legacymode.de/api/1 will return the foodplan of the day after. Weekends will be skipped in this numeration.

### Roadmap

### Contribution
If you want to Contribute just send a Pull request or write me an email.

### Demo
The API is online at _api.mensa.legacymo.de/_.
