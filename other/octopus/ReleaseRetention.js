const deployments = require('./Deployments.json');
const environments = require('./Environments.json');
const projects = require('./Projects.json');
const releases = require('./Releases.json');

function releaseRetention(number) {
    if(number <= 0) return null;

    let latestReleasesMap = new Map();
    let projectEnvironmentStr;
    let latestDeployedReleases;
    for(let deployment of deployments) {
        projectEnvironmentStr = JSON.stringify({ ProjectId: getProjectId(deployment.ReleaseId), EnvironmentId: deployment.EnvironmentId });
        latestDeployedReleases = latestReleasesMap.get(projectEnvironmentStr) || [];
        if(latestDeployedReleases) {
            insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, number);
            latestReleasesMap.set(projectEnvironmentStr, latestDeployedReleases);
        }
    }

    console.log(latestReleasesMap);

    let releaseSet = new Set();

    latestReleasesMap.forEach((value, key) => {
        let projectEnvironment = JSON.parse(key);
        if(projectEnvironmentIsIdInArray(projects, projectEnvironment.ProjectId) && projectEnvironmentIsIdInArray(environments, projectEnvironment.EnvironmentId)){
            for(let release of value) {
                releaseSet.add(release.ReleaseId);
            }
        }
    });

    return Array.from(releaseSet);
}

function getProjectId(releaseId) {
    for(let release of releases) {
        if(release.Id === releaseId) return release.ProjectId;
    }
    return null;
}

function insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, maxLen) {
    let newDateTimeMilliSec = Date.parse(deployment.DeployedAt) || 0;
    if(newDateTimeMilliSec === 0) return;

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
        else if(oldestDateTime > latestDeployedReleasesArray[i].DeployMillisec) {
                oldestDateTime = latestDeployedReleasesArray[i].DeployMillisec;
                oldestIndex = i;
        }
    }
    if(deployedRelease.DeployMillisec > oldestDateTime) {
        latestDeployedReleasesArray.splice(oldestIndex, 1, deployedRelease);
    }
}

function projectEnvironmentIsIdInArray(array, id) {
    for(let item of array) {
        if(item.Id === id) return true;
    }
    return false;
}

console.log(releaseRetention(1));