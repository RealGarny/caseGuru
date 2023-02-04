const { Client } = require('pg');

const config = {
  user: "trainee_user", // default process.env.PGUSER || process.env.USER
  password: "trainee_pass", //default process.env.PGPASSWORD
  host: "nodus.caseguru.ru", // default process.env.PGHOST
  database: "testtask", // default process.env.PGDATABASE || user
  port: 5432, // default process.env.PGPORT
}

const timeSpan = ['2022-06-01 00:00:00.000000', '2022-09-01 00:00:00.000000', 'complete'];

const query = {
  getAverageTime: {
  name: 'fetch-avg-time',
  text: 'SELECT avg_time, managerid FROM (select managerid, avg(processing_time) AS avg_time FROM orders WHERE statuscode = $3 AND createdat >= $1 AND createdat < $2 GROUP BY managerid) AS maxTime ORDER BY avg_time DESC', // this one took 3 hours of my life
  values: timeSpan,
  },
  getStatuses: {
    name: 'fetch-statuses',
    text: 'SELECT * FROM statuses',
  },
  getAll: {
    name: 'fetch-all-positions',
    text: 'SELECT * FROM orders',
    values: timeSpan,
  }

}

const client = new Client(config)

client.connect()

const fetchUniqueID = client.query(query.getAverageTime, (err,res) => {
  if(!err) {
    console.log('average completion time of managers from 2022-06-01 00:00:00.000000 to 2022-09-01 00:00:00.000000')
    console.log(res.rows)
  } else {
    console.log(err)
  }
})