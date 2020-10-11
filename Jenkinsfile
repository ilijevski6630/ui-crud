pipeline {
    agent any
    options {
        timestamps ()
        ansiColor('xterm')
    }
    environment {
        TAG = sh (
           script: 'git log --pretty=format:\'%h\' -n 1',
           returnStdout: true
        ).trim()
        AWS_ACCOUNT_ID = "360162455068"
        AWS_REGION = "eu-west-1"
        AWS_ECR = "https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        JENKINS_CREDENTIALS = ""
        DOCKER_IMAGE = "ui-crud"
    }
    stages {
        stage ('Remove old Docker images'){
            steps{
                sh 'yes | docker image prune -a'
            }
        }
        stage('Build container image') {
            steps {
                sh 'echo Docker Build and tag'
                sh 'docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${DOCKER_IMAGE}:latest -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${DOCKER_IMAGE}:${TAG} .'
            }
        }
        stage('Push container image to AWS ECR') {
            steps {
                sh 'echo Docker push to ECR'
                sh 'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ECR}'
                sh 'docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${DOCKER_IMAGE}:latest'
                sh 'docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${DOCKER_IMAGE}:${TAG}'
            }
        }
        stage('Deploy backend to Minikube') {
            steps {
                withCredentials([
                        file(credentialsId: 'CA_CRT', variable: 'CA_CRT'),
                        file(credentialsId: 'CLIENT_CRT', variable: 'CLIENT_CRT'),
                        file(credentialsId: 'CLIENT_KEY', variable: 'CLIENT_KEY'),
                        file(credentialsId: 'KUBECONFIGFILE', variable: 'KUBECONFIGFILE')
                ]) {
                    sh  """
                        cat ${CA_CRT} > ca.crt
                        cat ${CLIENT_CRT} > client.crt
                        cat ${CLIENT_KEY} > client.key
                        cat ${KUBECONFIGFILE} > kubeconfig
                        kubectl --kubeconfig=kubeconfig apply -f k8s/
                        """
                }
            }
        }
        stage('CleanWorkspace') {
            steps {
                cleanWs()
            }
        }
    }
}