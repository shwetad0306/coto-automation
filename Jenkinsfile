pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    NODE_ENV = 'test'
    PATH = "/opt/homebrew/bin:/usr/local/bin:/bin:/usr/bin"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm run setup'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
      post {
        always {
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }
  }
}
