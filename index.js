const core = require('@actions/core');
const fs   = require('fs');

const filePath = `./test/target`

const generateTestResults = async (runName) => {
    const results = JSON.parse(fs.readFileSync(`${filePath}/gatling/${runName}/js/stats.json`).toString());
    
    for(const result in results.contents) {
        const requestMetrics = results.contents[result];
    }

    await core.summary
        .addHeading(`Results for ${runName}`)
        .addTable([
            [{data: 'Request', header: true}, {data: 'p90', header: true}],
            ['foo.js', 'Pass ✅'],
            ['bar.js', 'Fail ❌'],
            ['test.js', 'Pass ✅']
        ])
        .addLink('View staging deployment!', 'https://github.com')
        .write()
}

const main = () => {
    // TODO: figure out why input is not registered 
    // const testPath = core.getInput('testPath');
    const lastRuns = fs.readFileSync(`${filePath}/gatling/lastRun.txt`).toString().trim().split('\n');

    for(const run of lastRuns) {
        generateTestResults(run)
    }
}

main();


