#deploy.ps1
# Configuration
$ServerUser = "user"
$ServerIP = "ip"
$DeployPath = "/opt/minio-console"

# Create deployment package
Write-Host "Creating deployment package..."
New-Item -ItemType Directory -Force -Path "deploy"
Copy-Item -Path "console" -Destination "deploy/"
Copy-Item -Path "server_setup.sh" -Destination "deploy/"

# Transfer files to server using SCP
Write-Host "Transferring files to server..."
scp -r deploy/* ${ServerUser}@${ServerIP}:${DeployPath}/

# Cleanup
Write-Host "Cleaning up..."
Remove-Item -Path "deploy" -Recurse -Force

Write-Host "Deployment package created and transferred successfully!" 