# Find an Issue

## Possibly, a better way to find github issues

This is simply a static React site (even the data is simply one big JSON file so I can avoid costs). The cron-job is simply there for display purposes, it is not used in the build process.

Data is fetched from `handler.js` function in `cron-job` directory. The function takes a rough route of deleting the entire table that the data is stored in (to get rid of all issues that have been respolved as well as to update labels that may have been added), creates a fresh table, and queries every repository in the array within `options.js`, pushing the issues into the table. This happens twice daily. 

### [Website](https://findanissue.com)

Hope you find an issue with the site!
