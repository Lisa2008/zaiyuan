
function releaseRetention(deploymentInfos) {
    if(!deploymentInfos || !deploymentInfos.deployments || deploymentInfos.deployments.constructor !== Array ||
        !deploymentInfos.environments || deploymentInfos.environments.constructor !== Array || 
        !deploymentInfos.projects || deploymentInfos.projects.constructor !== Array ||
        !deploymentInfos.releases || deploymentInfos.releases.constructor !== Array ||
        !deploymentInfos.numberOfMostRecent || deploymentInfos.numberOfMostRecent <= 0) return [];

    let latestReleasesMap = new Map();
    let projectEnvironmentStr;
    let latestDeployedReleases;
    for(let deployment of deploymentInfos.deployments) {
        if(!deployment.ReleaseId || !deployment.EnvironmentId) continue;
        projectEnvironmentStr = JSON.stringify({ ProjectId: getProjectId(deploymentInfos.releases, deployment.ReleaseId), EnvironmentId: deployment.EnvironmentId });
        latestDeployedReleases = latestReleasesMap.get(projectEnvironmentStr) || [];
        insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, deploymentInfos.numberOfMostRecent);
        latestReleasesMap.set(projectEnvironmentStr, latestDeployedReleases);
    }

    let releaseSet = new Set();

    // Log the most recently deployed releases list for each project/evnironment combination, 
    // and the releases that should be kept are from these list.

    console.log(`For each valid project/environment combination, the list of ${deploymentInfos.numberOfMostRecent} most recently deployed releases`)
    let logStr;
    latestReleasesMap.forEach((value, key) => {
        let projectEnvironment = JSON.parse(key);

        // Validate ProjectId and EnvironmentId according to projects and environments list
        if(projectEnvironmentIsIdInArray(deploymentInfos.projects, projectEnvironment.ProjectId) && projectEnvironmentIsIdInArray(deploymentInfos.environments, projectEnvironment.EnvironmentId)){
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
    if(!releases || !releaseId) return null;
    for(let release of releases) {
        if(release.Id === releaseId) return release.ProjectId || null;
    }
    return null;
}

function insertLatestDeployedReleaseArray(latestDeployedReleases, deployment, maxLen) {
    if(!deployment || !deployment.ReleaseId || !deployment.DeployedAt) return;

    let newDateTimeMilliSec = Date.parse(deployment.DeployedAt) || 0;
    if(newDateTimeMilliSec === 0) return;

    let arrayLen = latestDeployedReleases.length;
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
    let oldestDateTime = latestDeployedReleasesArray[0].DeployMillisec;
    let oldestIndex = 0;
    let arrayLen = latestDeployedReleasesArray.length;

    for(let i = 1; i < arrayLen; i++){
        if(oldestDateTime > latestDeployedReleasesArray[i].DeployMillisec) {
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
        if(!item.Id) continue;
        if(item.Id === id) return true;
    }
    return false;
}

module.exports = releaseRetention;