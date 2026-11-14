pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting code from GitHub'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Hospital Application'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Hospital Application'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Hospital Application'
            }
        }
    }

    post {

        success {
            echo 'Pipeline Success'
        }

        failure {
            echo 'Pipeline Failed'
        }

        always {
            echo 'Pipeline Finished'
        }
    }
}