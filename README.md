# Welcome to Simple Scenario Runner

### Contributers
 [Roni Polisanov](https://github.com/RoniPolisanov)<br>

### Design Architecture
<img src="https://i.ibb.co/27xNw76/Task-Manager-1.png" width="650px"><br>

### API
<b> TaskScheduler </b> - <br>
GET | http://localhost:3000/flow/status - Server status health check <br>
POST | http://localhost:3000/flow/add - Schedule flow! (must atttah flow JSON file) <br> <br> <br>
<b> TaskExecutive </b> - <br>
GET | http://localhost:4000/flow/status - Server status health check <br>
POST | http://localhost:4000/task/schedule - Start scheduling the tasks asynchronously <br> <br> <br>
<b> Monitor </b> - <br>
GET | http://localhost:5000/flow/status - Server status health check <br>
POST | http://localhost:5000/monitor/task - Delivers each task for documentation on the monitor <br>
