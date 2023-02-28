pipeline {
    agent none
    stages {
        stage('Deliver for development') {
            when {
                branch 'develop'
            }
            agent {
                label 'desarrollo-vistas'
            }
            steps {
                echo 'Instalando dependencias'
                sh 'npm install --force'
                echo 'Construyendo build'
                sh 'npm run build-dev'
            }
        }
    }
}