variable "gcp_project_id" {
  description = "The GCP project ID to deploy to."
  type        = string
}

variable "gcp_region" {
  description = "The GCP region to deploy to."
  type        = string
  default     = "europe-west3"
}

variable "gcp_zone" {
  description = "The GCP zone to deploy to."
  type        = string
  default     = "europe-west3-c"
}

variable "ssh_public_key" {
  description = "The SSH public key to add to the VM."
  type        = string
  sensitive   = true
}

variable "ssh_user" {
  description = "The username to associate with the SSH key."
  type        = string
  default     = "gcp-user"
}

variable "repo_url" {
  description = "The URL of the repository to clone."
  type        = string
}
