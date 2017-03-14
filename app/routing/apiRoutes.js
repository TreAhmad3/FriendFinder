var friendData = require("../data/friends.js");


module.exports = function(app){

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        for(var i=0; i<friendData.length; i++) {
            // Array containing differences between two arrays
            var differenceArray = [];
            // Sum of differences between two arrays
            var sumOfDifferences = 0;
            // Store current object's stats
            var currentFriendStats = friendData[i].scores;
            // user stats
            var userStats = req.body.scores;
            // Initiate calculation
            calculateDifferences(currentFriendStats, userStats);
            // Perform test
            if(i>0) {
                // If current 'person's' difference is smaller
                if(sumOfDifferences < smallestDeviation) {
                    // Assign that to parent variable
                    smallestDeviation = sumOfDifferences;
                    // Assign this person as compatible spirit
                    compatibleSpirit = friendData[i];
                }
            }else {
                // Assign current sum to parent variable
                smallestDeviation = sumOfDifferences;
                // Current friend data to compatible spirit
                compatibleSpirit = friendData[i];
            }

            // Calculate the difference array
            function calculateDifferences(arrayOne, arrayTwo) {
                // Get the difference array for current array and new array
                differenceArray = arrayOne.map(function(item, i) {
                    return Math.abs(item - arrayTwo[i]);
                });
                // Get sum of differences using the calculated array
                sumOfDifferences = getSumOfDifferences(differenceArray);
            }

            // Get the sum of differences
            function getSumOfDifferences(array) {
                return array.reduce((a,b) => a+b);
            }
        }
        // Send most compatible person after calculation
        res.json(compatibleSpirit);
        // Push the new user into friendsData
        friendData.push(req.body);
    });
};