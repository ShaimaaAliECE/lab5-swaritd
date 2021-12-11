// swarit dholakia - 251107834 - sdholaki@uwo.ca
//se3316 lab5

const path = require('path');
const express = require("express");
let jobsList = require("./jobs.json");
const { append } = require('express/lib/response');

const app = express();

//q1:
//-----
// create empty object; for each category in job for each job in json, count if not the same job if not in created object already, and convert back to json
app.get("/jobCategories", (req, res) => {

  let categories = {};

  for (let j in jobsList) {

    for (let c of jobsList[j].categories) {
      
      if (!categories[c]) categories[c] = 1;
      
      else categories[c]++;
    }
  }

  res.json(categories);
});
//-----

//q3:
//-----
// new array to hold jobs, find city name in job title, push city to new array, convert and send as json
app.get('/JobsByCity', (req, res) => {

    let foundJobs = [];

    let city = req.query.city;

    for (const prop in jobsList) 
    {
        let cityString = jobsList[prop].title;

        if (cityString.search(city) !== -1) 
        {
            foundJobs.push(prop);
        }
    }
    
    res.send(foundJobs)
})
//-----

//q2:
//-----
//new array to hold categories, iterate over json of jobs; if in parameters provided, append to array, then convert and send as json
app.get("/:category", (req, res) => {
  
  let jobs = [];

  for (let j in jobsList) {
    
    if (jobsList[j].categories.includes(req.params.category)) jobs.push(j);
  }

  res.json({ jobs: jobs });
});

app.listen(80);