#build.ps1
# Build the React frontend first
Write-Host "Building React frontend..."
cd web-app
yarn install
yarn build
cd ..

# Build the Go backend for Linux with embedded assets
Write-Host "Building Go backend for Linux..."
$env:GOOS = "linux"
$env:GOARCH = "amd64"
go build -o console ./cmd/console

Write-Host "Build completed successfully!" 