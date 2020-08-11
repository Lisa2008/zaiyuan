const releaseRetention = require('./ReleaseRetention');

const deploymentInfos = {
    deployments:  require('./Deployments.json'),
    environments: require('./Environments.json'),
    projects: require('./Projects.json'),
    releases: require('./Releases.json'),
    numberOfMostRecent: 2
};


console.log(releaseRetention(deploymentInfos));