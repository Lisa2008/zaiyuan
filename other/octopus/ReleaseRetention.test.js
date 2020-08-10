const releaseRetention = require('./ReleaseRetention');

const process = {
    deployments:  require('./Deployments.json'),
    environments: require('./Environments.json'),
    projects: require('./Projects.json'),
    releases: require('./Releases.json'),
    numberOfMostRecent: 1
};

test('1 most recently deployed releases', () =>{
    let result = [ 'Release-2', 'Release-1', 'Release-6' ];
	expect(releaseRetention(process)).toEqual(result);
});