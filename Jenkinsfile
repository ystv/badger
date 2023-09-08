@Library('ystv-jenkins')

def imageTag = ''
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
                    def imageNamePrefix = ''
                    if (env.BRANCH_NAME != 'main') {
                        imageNamePrefix = "${env.BRANCH_NAME}-"
                    }
                    imageTag = "${imageNamePrefix}${env.BUILD_NUMBER}"
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
                SERVER_SENTRY_DSN = credentials('bowser-server-sentry-dsn')
                SENTRY_AUTH_TOKEN = credentials('bowser-sentry-auth-token')
            }
            parallel {
                stage('Server') {
                    steps {
                        sh """docker build \\
                                --build-arg GIT_REV=${env.GIT_COMMIT} \\
                                --build-arg SERVER_SENTRY_DSN=\$SERVER_SENTRY_DSN \\
                                --build-arg SENTRY_AUTH_TOKEN=\$SENTRY_AUTH_TOKEN \\
                                --build-arg IS_PRODUCTION_BUILD=${env.BRANCH_NAME == 'main' ? 'true' : ''} \\
                                -t registry.comp.ystv.co.uk/ystv/bowser/server:${imageTag} \\
                                -f Dockerfile.server ."""
                    }
                }
                stage('Jobrunner') {
                    steps {
                        sh """docker build \\
                                --build-arg GIT_REV=${env.GIT_COMMIT} \\
                                --build-arg SENTRY_AUTH_TOKEN=\$SENTRY_AUTH_TOKEN \\
                                --build-arg IS_PRODUCTION_BUILD=${env.BRANCH_NAME == 'main' ? 'true' : ''} \\
                                -t registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageTag} \\
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
                    sh "docker push registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageTag}"
                    sh "docker push registry.comp.ystv.co.uk/ystv/bowser/server:${imageTag}"
                    script {
                        if (env.BRANCH_NAME == 'main') {
                            sh "docker tag registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageTag} registry.comp.ystv.co.uk/ystv/bowser/jobrunner:latest"
                            sh "docker tag registry.comp.ystv.co.uk/ystv/bowser/server:${imageTag} registry.comp.ystv.co.uk/ystv/bowser/server:latest"
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
                    text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/bowser/server:${imageTag}")
                ]
                build job: 'Deploy Nomad Job', parameters: [
                    string(name: 'JOB_FILE', value: 'bowser-jobrunner-dev.nomad'),
                    text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageTag}")
                ]
            }
        }

        stage('Deploy to production') {
            when {
                tag 'v*'
            }
            steps {
                build job: 'Deploy Nomad Job', parameters: [
                    string(name: 'JOB_FILE', value: 'bowser-prod.nomad'),
                    text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/bowser/server:${imageTag}")
                ]
                build job: 'Deploy Nomad Job', parameters: [
                    string(name: 'JOB_FILE', value: 'bowser-jobrunner-prod.nomad'),
                    text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/bowser/jobrunner:${imageTag}")
                ]
            }
        }
    }

    post { always {
        ciSkip action: 'postProcess'
        cleanWs()
    }}
}