# Welcome to Simple Scenario Runner

### Description
Run following flow and show AKA monitor flow states and after that total processing time.

### Design Architecture
<img src="https://i.ibb.co/27xNw76/Task-Manager-1.png" width="650px"><br>

### API
<b> TaskScheduler </b> - Schedules flows and sends them to the TaskExecutive. <br>
GET | http://localhost:3000/flow/status - Server status health check <br>
POST | http://localhost:3000/flow/add - Schedule flow! (must atttah flow JSON file) <br> <br> <br>
<b> TaskExecutive </b> - Goes through each received flow and runs all the tasks within it, according to different run times, and then sends the documentation to Monitor. <br>
GET | http://localhost:4000/flow/status - Server status health check <br>
POST | http://localhost:4000/task/schedule - Start scheduling the tasks asynchronously <br> <br> <br>
<b> Monitor </b> - Every request that goes into the monitor is documented (information for me the flow and for each task), as well as the exceptions end is documented. <br>
GET | http://localhost:5000/flow/status - Server status health check <br>
POST | http://localhost:5000/monitor/task - Delivers each task for documentation on the monitor <br>

### Contributers
 [Roni Polisanov](https://github.com/RoniPolisanov)<br>
