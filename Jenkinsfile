pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    NODE_ENV = 'test'
    PATH = "/opt/homebrew/bin:/usr/local/bin:/bin:/usr/bin"
    COTO_BASE_URL = "https://coto.world"
    ALERT_EMAIL = "panchrasshweta3@gmail.com"
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

    stage('Test (Desktop)') {
      steps {
        withCredentials([
          string(credentialsId: 'coto_phone', variable: 'COTO_PHONE'),
          string(credentialsId: 'coto_otp', variable: 'COTO_OTP')
        ]) {
          sh 'npm test'
        }
      }
      post {
        failure {
          mail to: "${ALERT_EMAIL}",
               subject: "Jenkins Playwright Desktop Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
               body: "Build failed. Check console output: ${env.BUILD_URL}"
        }
        always {
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }
    stage('Test (Mobile)') {
      steps {
        withCredentials([
          string(credentialsId: 'coto_phone', variable: 'COTO_PHONE'),
          string(credentialsId: 'coto_otp', variable: 'COTO_OTP')
        ]) {
          sh 'COTO_MOBILE=1 npm run test:mobile'
        }
      }
      post {
        failure {
          mail to: "${ALERT_EMAIL}",
               subject: "Jenkins Playwright Mobile Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
               body: "Build failed. Check console output: ${env.BUILD_URL}"
        }
        always {
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }
  }
}
