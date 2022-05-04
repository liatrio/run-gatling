# run-gatling
run-gatling is a GitHub action that sets up Gatling in your workflow and allows you to continuously test your app's performance as part of its' continuous testing (CT) pipeline.

# Philosophy
Performance testing in the DevOps world is often thought as "needed" but is really just used as a gatekeeper to deploy to production. The truth is that performance testing is great at preventing bad user experience as well as lowering infrastructure cost (cloud and on-prem).

The goal of this action is to simplify execution by providing an easy way to integrate their Gatling test suite to their GitHub workflows.
