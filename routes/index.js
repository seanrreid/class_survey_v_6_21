const { response } = require('express');
const express = require('express');
const router = express.Router();
const ClassSurveyModel = require('../models/ClassSurveyModel');

router.get('/', async (req, res) => {
    const topicData = await ClassSurveyModel.getAllTopicData();
    const rankings = await ClassSurveyModel.getAllRankings();

    res.render('template', {
        locals: {
            title: 'Class Survey',
            data: topicData,
            rankings: rankings,
        },
        partials: {
            body: 'partials/home',
        },
    });
});

router.get('/error', async (req, res) => {
    const { error } = req.query;

    let errorMessage = error;

    if (!error) {
        errorMessage = 'No Error Message Defined';
    }

    res.render('template', {
        locals: {
            title: 'ERROR PAGE',
            errorMessage: errorMessage,
        },
        partials: {
            body: 'partials/error',
        },
    });
});

// @TODO - This update will handle errors if the UPDATE didn't return any rows.
//         We still need error handling if the response comes back invalid. - SR
router.post('/update', async (req, res) => {
    // Create an array to store our responses
    let responses = [];

    for (let key in req.body) {
        const response = await ClassSurveyModel.updateRanking(key, req.body[key]);
        // Create an object to save the status of each response
        let status = {};
        // Save the topic name, pull from the 'key' variable
        status['topic'] = key;
        // Save the rowCount, either 0 or 1
        status['rowCount'] = response.rowCount;
        // Add the status object to the array of responses...
        responses.push(status);
    }

    // Filter through the response arrow, return any topic who's rowCount is 0
    // the filter() method will return a new array object, assigned to invalidEntry
    const invalidEntry = responses.filter(
        (response) => response.rowCount === 0
    );

    // Check to see if the invalidEntry array has any items
    if (!invalidEntry.length) {
        // If the invalidEntry array is empty, we're all clear, reload the page!
        res.redirect('/');
    } else {
        // Create a string to store a list of the topic names in the invalidEntry array
        let errorMessage = '';
        // If there are invalidEntry items, loop through them and append to our string
        invalidEntry.forEach((entry) => (errorMessage += `, ${entry.topic}`));
        // Redirect to the '/error' route,
        // Pass the error message containinng the topics and explanatory text
        res.redirect(
            `/error?error="Unable to update the following topic(s)${errorMessage}`
        );
    }
});

module.exports = router;
