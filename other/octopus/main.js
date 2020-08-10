const releaseRetention = require('./ReleaseRetention');

const process = {
    deployments:  require('./Deployments.json'),
    environments: require('./Environments.json'),
    projects: require('./Projects.json'),
    releases: require('./Releases.json'),
    numberOfMostRecent: 10
};

console.log(releaseRetention(process));