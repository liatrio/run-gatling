/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 932:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs   = __nccwpck_require__(147);

module.exports = async ({github, context, core}) => {
    const pomPath = process.env.TEST_PATH
    const lastRuns = fs.readFileSync(`${pomPath}/target/gatling/lastRun.txt`).toString().trim().split('\n');

    for(const run of lastRuns) {
        const results = JSON.parse(fs.readFileSync(`${pomPath}/target/gatling/${run}/js/stats.json`).toString());
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
            .addHeading(`Results for ${run}`)
            .addTable(tableContent)
            .addQuote('All times are in millisecond (ms). RPS means "Requests per Second"')
            .write()
    }
}


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(932);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;