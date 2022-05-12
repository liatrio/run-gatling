const core = require('@actions/core');
const fs   = require('fs');

const generateTestResults = (runName) => {
    const results = JSON.parse(fs.readFileSync(`./test/target/gatling/${runName}/js/stats.json`).toString()).contents;
    for(const result of results) {
        console.log(JSON.stringify(result));
    }
}

const main = () => {
    // TODO: figure out why input is not registered 
    // const testPath = core.getInput('testPath');
    const lastRuns = fs.readFileSync(`./test/target/gatling/lastRun.txt`).toString().split('\n');

    for(const run of lastRuns) {
        generateTestResults(run)
    }
}

main();

// await core.summary
//     .addHeading('Gatling Test Results')
//     .addCodeBlock(generateTestResults(), "js")
//     .addTable([
//         [{data: 'Request', header: true}, {data: 'p90', header: true}],
//         ['foo.js', 'Pass ✅'],
//         ['bar.js', 'Fail ❌'],
//         ['test.js', 'Pass ✅']
//     ])
//     .addLink('View staging deployment!', 'https://github.com')
//     .write()


