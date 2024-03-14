variable "public_ip" {
  description = "The ip's of the instance."
  type        = list(string)
}

variable "cloudflare_zone_ids" {
  type = map(string)
  description = "Mapping of domain names to Cloudflare zone IDs"
  default = {
    "astromanga.com" = "b240f1f918bbc994dc53a9a9940ba321"
    "auramanga.com" = "af9e01fbe3661f4df40b7d29aeb9aa9a"
    // Add more domains as needed
  }
}


