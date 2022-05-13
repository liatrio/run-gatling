const fs   = require('fs');

const generateTestResults = async (runName, core, testPath) => {
    const results = JSON.parse(fs.readFileSync(`${testPath}/target/gatling/${runName}/js/stats.json`).toString());
    let tableContent = [
        [
            {data: 'Request', header: true}, 
            {data: 'Success ✅', header: true}, 
            {data: 'Errors ❌', header: true}, 
            {data: 'Min', header: true},
            {data: 'Max', header: true},
            {data: 'Avg.', header: true},
            {data: 'Std. Dev.', header: true},
            {data: 'RPS', header: true},
        ]
    ];
    
    for(const result in results.contents) {
        const requestMetrics = results.contents[result].stats;
        tableContent.push([
            requestMetrics.name,
            requestMetrics.numberOfRequests.ok.toString(),
            requestMetrics.numberOfRequests.ko.toString(),
            requestMetrics.minResponseTime.total.toString(),
            requestMetrics.maxResponseTime.total.toString(),
            requestMetrics.meanResponseTime.total.toString(),
            requestMetrics.standardDeviation.total.toString(),
            requestMetrics.meanNumberOfRequestsPerSecond.total.toString(),
        ]);
    }

    await core.summary
        .addHeading(`Results for ${runName}`)
        .addTable(tableContent)
        .addQuote('All times are in millisecond (ms). RPS means "Requests per Second"')
        .write()
}

const main = () => {
    
}

module.exports = async ({github, context, core}) => {
    const testPath = core.getInput('testPath')
    console.log("testPath: " + core.getInput("testPath"))
    const lastRuns = fs.readFileSync(`${testPath}/target/gatling/lastRun.txt`).toString().trim().split('\n');

    for(const run of lastRuns) {
        generateTestResults(run, core, testPath)
    }
}
