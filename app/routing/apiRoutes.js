var path = require("path");
var friends = require("../data/friends")

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        var matchedFriend;

        for (obj in friends) {
            let sumDifference = 0;
            for (val in friends[obj].scores) {
                sumDifference += Math.abs(parseInt(friends[obj].scores[val]) - parseInt(newFriend.scores[val]));
            }
            if (!matchedFriend) {
                matchedFriend = friends[obj];
                matchedFriend.difference = sumDifference;
            } else if (matchedFriend.difference > sumDifference) {
                matchedFriend = friends[obj];
                matchedFriend.difference = sumDifference;
            }
        }
        friends.push(newFriend);

        res.json(matchedFriend);
    });

};