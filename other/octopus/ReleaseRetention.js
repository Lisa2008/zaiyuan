
function releaseRetention(process) {
    if(process.numberOfMostRecent <= 0) return null;

    let latestReleasesMap = new Map();
    let projectEnvironmentStr;
    let latestDeployedReleases;
    for(let deployment of process.deployments) {
        projectEnvironmentStr = JSON.stringify({ ProjectId: getProjectId(process.releases, deployment.ReleaseId), EnvironmentId: deployment.EnvironmentId });
        latestDeployedReleases = latestReleasesMap.get(projectEnvironmentStr) || [];
        insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, process.numberOfMostRecent);
        latestReleasesMap.set(projectEnvironmentStr, latestDeployedReleases);
    }

    let releaseSet = new Set();

    console.log(`For each valid project/environment combination, the list of ${process.numberOfMostRecent} most recently deployed releases`)
    let logStr;
    latestReleasesMap.forEach((value, key) => {
        let projectEnvironment = JSON.parse(key);
        if(projectEnvironmentIsIdInArray(process.projects, projectEnvironment.ProjectId) && projectEnvironmentIsIdInArray(process.environments, projectEnvironment.EnvironmentId)){
            logStr = `[${projectEnvironment.ProjectId}, ${projectEnvironment.EnvironmentId}] => [`;
            for(let release of value) {
                logStr += `${release.ReleaseId}, `;
                releaseSet.add(release.ReleaseId);
            }
            logStr = `${logStr.slice(0, logStr.length - 2)}]`;
            console.log(logStr);
        }
    });

    return Array.from(releaseSet);
}

function getProjectId(releases, releaseId) {
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

module.exports = releaseRetention;