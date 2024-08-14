terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.16.1"
    }
  }

  backend "s3" {
    bucket = "whalescanapi"
    key    = "dev/terraform.tfstate"
    region = "eu-north-1"
  }
}

provider "aws" {
  region = "eu-north-1"
}
