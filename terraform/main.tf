terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
  backend "gcs" {
    bucket = "your-gcs-bucket-for-tf-state" # Replace with your GCS bucket name
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
  zone    = var.gcp_zone
}

resource "google_compute_instance" "app_instance" {
  name         = "commenttest-app-instance"
  machine_type = "e2-medium" # Increased machine type for NestJS app
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
      size  = 30 # Increased disk size
    }
  }

  network_interface {
    network = "default"
    access_config {} # Assigns a public IP
  }

  metadata = {
    "ssh-keys" = "${var.ssh_user}:${var.ssh_public_key}"
  }

  metadata_startup_script = <<-EOF
    #!/bin/bash
    set -e

    # Wait for dpkg lock to be released
    while fuser /var/lib/dpkg/lock >/dev/null 2>&1 ; do sleep 1; done
    while fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1 ; do sleep 1; done

    # Update and install necessary packages
    apt-get update
    apt-get install -y git ca-certificates curl gnupg lsb-release

    # Install Docker
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    # Add ssh_user to docker group
    usermod -aG docker ${var.ssh_user}

    # Install Ansible prerequisites
    apt-get install -y python3-pip
    pip3 install ansible docker

    echo "VM setup complete. Ready for Ansible provisioning."
  EOF

  tags = ["http-server", "https-server", "ssh"]
}

resource "google_compute_firewall" "allow_ssh_http" {
  name    = "allow-ssh-http-commenttest"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22", "80", "443", "3000"] # Allow SSH, HTTP, HTTPS, and app port
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server", "https-server", "ssh"]
}

output "instance_ip" {
  description = "The external IP address of the VM instance."
  value       = google_compute_instance.app_instance.network_interface[0].access_config[0].nat_ip
}
