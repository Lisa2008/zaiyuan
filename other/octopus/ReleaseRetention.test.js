const releaseRetention = require('./ReleaseRetention');
let deploymentInfos;
let results;

beforeEach(() => {
    deploymentInfos = {
        deployments:  require('./Deployments.json'),
        environments: require('./Environments.json'),
        projects: require('./Projects.json'),
        releases: require('./Releases.json'),
        numberOfMostRecent: 1
    };
  });

describe('The releases that should be kept', () => {
    it('1 most recently deployed release for each project/environment combination', () => {
        results = [ 'Release-2', 'Release-1', 'Release-6' ]; 
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });
    it('2 most recently deployed releases for each project/environment combination', () => {
        deploymentInfos.numberOfMostRecent = 2;
        results = [ 'Release-1', 'Release-2', 'Release-7', 'Release-6' ];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });
    it('10 most recently deployed releases for each project/environment combination', () => {
        deploymentInfos.numberOfMostRecent = 10;
        results = [ 'Release-1', 'Release-2', 'Release-5', 'Release-6', 'Release-7' ];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });
});

describe('When input values are not correct', () => {
    it('When deploymentInfos.numberOfMostRecent is undefined, it should return empty array', () => {
        deploymentInfos.numberOfMostRecent = undefined;
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.numberOfMostRecent is 0, it should return empty array', () => {
        deploymentInfos.numberOfMostRecent = 0;
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.deployments is empty, it should return empty array', () => {
        deploymentInfos.deployments = [];
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.deployments is not an array, it should return empty array', () => {
        deploymentInfos.deployments = {a: 1, b: 2};
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.deployments is an array of cropped data, returns results of valid data', () => {
        deploymentInfos.deployments = [
            {
              "ReleaseId": "Release-1",
              "EnvironmentId": "Environment-1",
              "DeployedAt": "2000-01-01T10:00:00"
            },
            {
              "Id": "Deployment-2",
              "ReleaseId": null,
              "EnvironmentId": "Environment-1",
              "DeployedAt": "2000-01-02T10:00:00"
            }];
        results = [ 'Release-1' ];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.environments is undefined, it should return empty array', () => {
        deploymentInfos.environments = undefined;
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.environments is not an array, it should return empty array', () => {
        deploymentInfos.environments = 'Test String';
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.environments is cropped data, returns results of valid data', () => {
        deploymentInfos.environments = [
            {
              "Id": "Environment-1",
              "Name": "Staging"
            },
            {
              "Name": "Production"
            }
          ];
        results = [ 'Release-2', 'Release-6' ];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.projects is undefined, it should return empty array', () => {
        deploymentInfos.projects = undefined;
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.projects is not an array, it should return empty array', () => {
        deploymentInfos.projects = 'Test String';
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.projects is cropped data, returns results of valid data', () => {
        deploymentInfos.projects = [
            {
              "Id": null,
              "Name": "Random Quotes"
            },
            {
              "Id": "Project-2",
              "Name": null
            }
          ];
        results = [ 'Release-6' ];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.releases is null, it should return empty array', () => {
        deploymentInfos.releases = null;
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.releases is not an array, it should return empty array', () => {
        deploymentInfos.releases = {a: 1, b: 2};
        results = [];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });

    it('When deploymentInfos.releases is cropped data, returns results of valid data', () => {
        deploymentInfos.releases = [
            {
                "Id": null,
                "ProjectId": "Project-2",
                "Version": "1.0.0",
                "Created": "2000-01-01T09:00:00"
              },
              {
                "Id": "Release-5",
                "ProjectId": "Project-2",
                "Version": "1.0.1-ci1",
                "Created": "2000-01-01T10:00:00"
              },
              {
                "Id": "Release-6",
                "ProjectId": null,
                "Version": "1.0.2",
                "Created": "2000-01-02T09:00:00"
              }
          ];
        results = [ 'Release-5' ];
        expect(releaseRetention(deploymentInfos)).toEqual(results);
    });
})
