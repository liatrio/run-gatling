const core = require('@actions/core');
const fs   = require('fs');

const generateTestResults = (runName) => {
    console.log(runName);
}

const main = () => {
    const testPath = core.getInput('testPath');
    const lastRuns = fs.readFileSync(`./${testPath}target/gatling/lastRun.txt`).toString().split('\n');

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


