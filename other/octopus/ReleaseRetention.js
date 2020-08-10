
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

    // Log the most recently deployed releases list for each project/evnironment combination, 
    // and the releases that should be kept are from these list.

    console.log(`For each valid project/environment combination, the list of ${process.numberOfMostRecent} most recently deployed releases`)
    let logStr;
    latestReleasesMap.forEach((value, key) => {
        let projectEnvironment = JSON.parse(key);

        // Validate ProjectId and EnvironmentId according to projects and environments list
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
        if(release.Id === releaseId) return release.ProjectId || null;
    }
    return null;
}

function insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, maxLen) {
    let newDateTimeMilliSec = Date.parse(deployment.DeployedAt) || 0;
    // If a deployment does not have DeployedAt property, it is an invalid deployment, just return.
    if(newDateTimeMilliSec === 0) return;

    let arrayLen = latestDeployedReleases.length || 0;
    let i;
    
    for(i = 0; i < arrayLen; i++) {
        // If current deployment's release is in the most recently list, and current deployment time is newer than the recorded one,
        // just update the release's deployment time
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
            // If current deployment's release is not in the most recently releases list, 
            // but the deployment time is newer than the most recently releases list's oldest release deployment time,
            // replace the release with oldest deployment time with the current deployment's release.
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