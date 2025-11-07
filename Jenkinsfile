pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REPO = "842903729653.dkr.ecr.ap-south-1.amazonaws.com/nodeapp"
        DOCKER_IMAGE = "guruyogendra/nodeapp"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo "📥 Cloning repository..."
                git branch: 'main', url: 'https://github.com/guruyogendra/devops-docker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing Node.js dependencies..."
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo "🔐 Logging into Docker Hub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo "⬆️ Pushing image to Docker Hub..."
                sh 'docker push $DOCKER_IMAGE:latest'
            }
        }

        stage('Deploy Application on EC2') {
            steps {
                echo "🚀 Deploying container on EC2..."
                sh '''
                docker stop nodeapp || true
                docker rm nodeapp || true
                docker pull $DOCKER_IMAGE:latest
                docker run -d -p 80:3000 --name nodeapp $DOCKER_IMAGE:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed! Check Jenkins logs for more info.'
        }
    }
}
