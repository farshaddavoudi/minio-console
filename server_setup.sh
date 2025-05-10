
# Create deployment directory
sudo mkdir -p /opt/minio-console
sudo chown -R user:user /opt/minio-console

# Make binary executable
chmod +x /opt/minio-console/console

# Create systemd service
sudo tee /etc/systemd/system/minio-console.service << EOF
[Unit]
Description=MinIO Console
After=network.target

[Service]
Type=simple
User=kadmin
WorkingDirectory=/opt/minio-console
EnvironmentFile=/etc/default/minio-console
ExecStart=/opt/minio-console/console server
Restart=always
RestartSec=5
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=minio-console

[Install]
WantedBy=multi-user.target
EOF

# Enable and start MinIO Console service
sudo systemctl daemon-reload
sudo systemctl enable minio-console
sudo systemctl start minio-console

# Check service status
echo "Checking MinIO Console status..."
sudo systemctl status minio-console
echo "Checking MinIO Console logs..."
sudo journalctl -u minio-console -f