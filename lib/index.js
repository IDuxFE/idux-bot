"use strict";
var handler_1 = require("./handler");
module.exports = function (app) {
    app.on('issues.opened', handler_1.onIssuesOpened);
    app.on('issues.labeled', handler_1.onIssuesLabeled);
    app.on('pull_request.opened', handler_1.onPullRequestOpened);
    app.on('pull_request.labeled', handler_1.onPullRequestLabeled);
    app.on('release.published', handler_1.onReleasePublished);
    // For more information on building apps:
    // https://probot.github.io/docs/
    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};
