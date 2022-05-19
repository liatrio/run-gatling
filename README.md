# run-gatling
This action sets up Gatling in your workflow and allows continuous testing (CT) of an app's performances.

# Context
In the DevOps world, performance engineering is often thought as critical. Yet somehow, it is also greatly overlooked or done too late in the Software Development Lifecycle (SDLC).

This action tries to solve that exact problem by enabling development teams to take ownership of their applications' performances. It leverages the "as Code" performance testing tool `Gatling` and the power of `GitHub Actions` allowing developer to write their tests, version them, and integrate them within the CI/CT workflow.

# Usage
```yaml
- uses: liatrio/run-gatling@v1.1.0
  with:
    # Java Version to use
    # Default: '17'
    javaVersion: ''

    # Java Distribution to use
    # Default: 'microsoft'
    javaDistribution: ''

    # Path to the Gatling Test Suite's pom.xml file
    # Default: './test'
    pomPath: ''

    # Name of the repository to checkout ('org/repo')
    # Default: ''
    # (Optionnal)
    repoName: ''

    # Tag, Branch, or Commit SHA for the Test Suite repository
    # Default: ''
    # (Optionnal)
    repoRef: ''

    # Class of the simulation to run ('myPackage.MySimulationClass')
    # Default: ''
    # (Optionnal)
    # Note: If the Test Suite contains more than one simulation,
    #       you may want to configure the Maven plugin to run 
    #       multiple simulations. Otherwise, you will have to fill this
    #       parameter with the specific simulation to execute.
    simulationClass: ''
```
# Scenarios

## Execute local tests
```yaml
- uses: liatrio/run-gatling@v1.1.0
  with:
    pomPath: my_test_suite/path
```

## Execute a specific simulation
```yaml
- uses: liatrio/run-gatling@v1.1.0
  with:
    pomPath: my_test_suite/path
    simulationClass: simulationsPkg.MySimulationClass
```

## Execute tests from a repository
```yaml
- uses: liatrio/run-gatling@v1.1.0
  with:
    repoName: liatrio/gatling-maven-showcase
    repoRef: main
```