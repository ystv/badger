@Library('ystv-jenkins')

def imageNamePrefix = ''
pipeline {
    agent {
        label 'docker'
    }

    environment {
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Prepare') {
            steps {
                ciSkip action: 'check'
                script {
                    if (env.BRANCH_NAME != 'main') {
                        imageNamePrefix = "${env.BRANCH_NAME}-"
                    }
                }
            }
        }
        stage('Download Dependencies') {
            steps {
                sh 'docker build -f Dockerfile.common .'
            }
        }
        stage('Build Images') {
            environment {
                SENTRY_DSN = credentials('bowser-sentry-dsn')
            }
            parallel {
                stage('Server') {
                    steps {
                        sh """docker build 
                                --build-arg GIT_REV=${env.GIT_COMMIT} \\
                                --build-arg SENTRY_DSN=\$SENTRY_DSN \\
                                --build-arg IS_PRODUCTION_BUILD=${env.BRANCH_NAME == 'main' ? 'true' : ''} \\
                                -t registry.comp.ystv.co.uk/ystv/bowser/server:${imageNamePrefix}${env.BUILD_NUMBER} \\
                                -f Dockerfile.server ."""
                    }
                }
                stage('Jobrunner') {
                    steps {
                        sh """docker build \\
                                --build-arg GIT_REV=${env.GIT_COMMIT} \\
                                --build-arg SENTRY_DSN=\$SENTRY_DSN \\
                                -t registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageNamePrefix}${env.BUILD_NUMBER} \\
                                -f Dockerfile.jobrunner ."""
                    }
                }
            }
        }

        stage('Push') {
            when {
                branch 'main'
            }
            steps {
                withDockerRegistry(credentialsId: 'docker-registry', url: 'https://registry.comp.ystv.co.uk') {
                    sh "docker push registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageNamePrefix}${env.BUILD_NUMBER}"
                    sh "docker push registry.comp.ystv.co.uk/ystv/bowser/server:${imageNamePrefix}${env.BUILD_NUMBER}"
                    script {
                        if (env.BRANCH_NAME == 'main') {
                            sh "docker tag registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageNamePrefix}${env.BUILD_NUMBER} registry.comp.ystv.co.uk/ystv/bowser/jobrunner:latest"
                            sh "docker tag registry.comp.ystv.co.uk/ystv/bowser/server:${imageNamePrefix}${env.BUILD_NUMBER} registry.comp.ystv.co.uk/ystv/bowser/server:latest"
                            sh 'docker push registry.comp.ystv.co.uk/ystv/bowser/jobrunner:latest'
                            sh 'docker push registry.comp.ystv.co.uk/ystv/bowser/server:latest'
                        }
                    }
                }
            }
        }

        stage('Deploy to development') {
            when {
                branch 'main'
            }
            steps {
                build job: 'Deploy Nomad Job', parameters: [
                    string(name: 'JOB_FILE', value: 'bowser-dev.nomad'),
                    text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/bowser/server:${env.BUILD_NUMBER}")
                ]
                build job: 'Deploy Nomad Job', parameters: [
                    string(name: 'JOB_FILE', value: 'bowser-jobrunner-dev.nomad'),
                    text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${env.BUILD_NUMBER}")
                ]
            }
        }
    }

    post { always {
        ciSkip action: 'postProcess'
        cleanWs()
    }}
}