'use strict'
const sql = require('mssql');

// Take DB Config from environment variables set in Lambda config
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    enableArithAbort: false
  },
};

const response = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,PUT',
    'Set-Cookie': 'XSRF-TOKEN=SOMERANDOMSTRING'
  },
  body: 'success',
};

module.exports.hello = async () => {
  try {

    const config = {
      user: 'Admin_Dev',
      password: 'SPS$My#Health.Chart3Dev;',
      server: 'sqlserver2019-myhealthchart-dev.cypy9g8vfaq6.eu-west-2.rds.amazonaws.com',
      database: 'MyHealthChartDev',
      options: {
        encrypt: false, // Use this if you're on Windows Azure
        enableArithAbort: false
      },
    };
    // Open DB Connection
    const pool = await sql.connect(config);

    // Query Database
    const request = await pool.request();

    const result = await request.execute('GetGenders');

    // Close DB Connection
    pool.close();

    // The results of our query
    //console.log('Results:', result.recordset);
    const responseObject = {
      Records: result.recordset,
    }

    // Use callback if you need to return values from your lambda function.
    response.statusCode = 200;
    response.body = JSON.stringify(responseObject);
    console.log(response);
    return response;
  } catch (err) {
    // Error running our SQL Query
    console.error('ERROR: Exception thrown running SQL', err);
    response.statusCode = 408;
    response.body = 'Something went wrong!';
    return response;
  }
};


