pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "guruyogendra/nodeapp"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo "Cloning the GitHub repository..."
                git branch: 'main', url: 'https://github.com/guruyogendra/devops-docker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                echo "Logging into Docker Hub and pushing the image..."
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKERHUB_PASS')]) {
                    sh '''
                    echo "$DOCKERHUB_PASS" | docker login -u guruyogendra --password-stdin
                    docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy Application on EC2') {
            steps {
                echo "Deploying container on EC2 instance..."
                sh '''
                # Stop and remove any running container
                docker stop nodeapp || true
                docker rm nodeapp || true

                # Pull latest image and run
                docker pull $DOCKER_IMAGE:latest
                docker run -d -p 80:3000 --name nodeapp $DOCKER_IMAGE:latest
                '''
            }
        }
    }

    post {
        success {
            mail to: 'your-email@example.com',
                 subject: 'Jenkins Pipeline Success - NodeApp Deployed!',
                 body: 'The Node.js application has been successfully built, pushed to Docker Hub, and deployed on EC2.'
        }
        failure {
            mail to: 'your-email@example.com',
                 subject: 'Jenkins Pipeline Failed!',
                 body: 'The Jenkins pipeline failed. Please check the Jenkins console logs for details.'
        }
    }
}
