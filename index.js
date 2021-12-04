// swarit dholakia - 251107834 - sdholaki@uwo.ca
//se3316 lab5

//setup
//-----
const express = require ('express');
let jobs_in_json = require ('./jobs.json');
const app = express();
app.use(express.static('htmls'));
//-----

//q1:
//-----
// create empty object; for each category in job for each job in json, count if not the same job if not in created object already, and convert back to json
app.get('/ListAllCategories', (req,res) => {
        let categories = {};      
        for (let j in jobs_in_json)
        {   
            for (let c of jobs_in_json[j].categories)
                if (!categories[c])
                {
                    categories[c] = 1;   
                }
                else
                    categories[c]++;
        }
        res.json(categories);
    
    });
//-----

//q2:
//-----
//new array to hold categories, iterate over json of jobs; if in parameters provided, append to array, then convert and send as json
app.get('/:TheCategory', (req,res) =>{
    let jobsInCategories =[];  
    for(let j in jobs_in_json)
    {
        if(jobs_in_json[j].categories.includes(req.params.category))
        {
            jobsInCategories.push(j);
        }
    }
    res.json({
        jobs: jobsInCategories
    })
});
//-----

//q3:
//-----
// new array to hold jobs, find city name in job title, push city to new array, convert and send as json
app.get('/ListAllJobCities', (req,res)=> {
    let jobsincity = [];
    for (let j in jobs_in_json)
    {
        if (jobs_in_json[j].title.includes(req.query.city))
        {
            jobsincity.push(j);   
        }
    }
    res.json(
        {
            jobs: jobsincity
        }
    );
});
//-----

//live @ port 80
app.listen(80);  