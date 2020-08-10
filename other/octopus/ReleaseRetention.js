const deployments = require('./Deployments.json');
const environments = require('./Environments.json');
const projects = require('./Projects.json');
const releases = require('./Releases.json');

function releaseRetention(number) {
    if(number <= 0) return null;

    let latestReleasesMap = new Map();
    initLatestDeploymentMap(latestReleasesMap);

    let projectEnvironmentStr;
    let latestDeployedReleases;
    for(let deployment of deployments) {
        projectEnvironmentStr = JSON.stringify({ ProjectId: getProjectId(deployment.ReleaseId), EnvironmentId: deployment.EnvironmentId });
        latestDeployedReleases = latestReleasesMap.get(projectEnvironmentStr);
        if(latestDeployedReleases) {
            insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, number);
            latestReleasesMap.set(projectEnvironmentStr, latestDeployedReleases);
        }
    }

    console.log(latestReleasesMap);

    let releaseSet = new Set();

    for(let values of latestReleasesMap.values()) {
        for(let value of values) {
            releaseSet.add(value.ReleaseId);
        }
    }

    return Array.from(releaseSet);
}

function initLatestDeploymentMap(map) {
    let projectEnvironment;
    for(let project of projects){
        for(let environment of environments){
            projectEnvironment = JSON.stringify({ ProjectId: project.Id, EnvironmentId: environment.Id });
            map.set(projectEnvironment, []);
        }
    }
}

function getProjectId(releaseId) {
    for(let release of releases) {
        if(release.Id === releaseId) return release.ProjectId;
    }
    return null;
}

function insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, maxLen) {
    let newDateTimeMilliSec = Date.parse(deployment.DeployedAt);
    let arrayLen = latestDeployedReleases.length || 0;
    let i;
    
    for(i = 0; i < arrayLen; i++) {
        if(latestDeployedReleases[i].ReleaseId === deployment.ReleaseId && latestDeployedReleases[i].DeployMillisec < newDateTimeMilliSec) {
            latestDeployedReleases[i].DeployMillisec = newDateTimeMilliSec;
            break;
        }
    }
    if(i === arrayLen) {
        let newDeployedRelease = {ReleaseId: deployment.ReleaseId, DeployMillisec: newDateTimeMilliSec};
        if(arrayLen < maxLen) {
            latestDeployedReleases.push(newDeployedRelease);
        }
        else { 
            replaceLatestDeployedReleaseArray(latestDeployedReleases, newDeployedRelease);
        }
    }
}

function replaceLatestDeployedReleaseArray(latestDeployedReleasesArray, deployedRelease) {
    let oldestDateTime = null;
    let oldestIndex;
    let arrayLen = latestDeployedReleasesArray.length;

    for(let i = 0; i < arrayLen; i++){
        if(!oldestDateTime) {
            oldestDateTime = latestDeployedReleasesArray[i].DeployMillisec;
            oldestIndex = i;
        }
        else {
            if (oldestDateTime > latestDeployedReleasesArray[i].DeployMillisec){
                oldestDateTime = latestDeployedReleasesArray[i].DeployMillisec;
                oldestIndex = i;
            }
        }
    }
    if(deployedRelease.DeployMillisec > oldestDateTime){
        latestDeployedReleasesArray.splice(oldestIndex, 1, deployedRelease);
    }
}

console.log(releaseRetention(10));