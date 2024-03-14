variable "vpc_cidr" {
  description = "VPC CIDR Range"
  type = string
}

variable "subnet_cidr" {
    description = "Subnet CIDRS"
    type = list(string)
}

variable "cloudflare_zone_ids" {
  type = map(string)
  description = "Mapping of domain names to Cloudflare zone IDs"
  default = {
    "astromanga.com" = "b240f1f918bbc994dc53a9a9940ba321"
    "auramanga.com" = "af9e01fbe3661f4df40b7d29aeb9aa9a"
    "comicbreeze.com" = "b873248295e363bb48df041a63b6fd8c"
    "animevariant.com" = "e2348ce2e55eafb8317c9a111450b6b4"
    "comicharbor.com" = "7a12ce251110331ca06d29a6974b2185"
    "ghostscans.com" = "0cfb6927807213ea51e5c3c3dda00f5f"
    "ethermanga.com" = "cb47acbf10fe8ee7b50afdca0190001c"
    "knightscans.com" = "93e68927da0fc2abf78d416b4e8a0075"
    "mangaburst.com" = "ddc96c37024f67513a269017562e4acc"
    "mangafable.com" = "8cfdbd80b5a6f50aa2f1e50ae2fb69b3"
    "mangacrest.com" = "423f67fe279a9398e2b1e8719c91e8e6"
    "mangaloom.com" = "10a34c581e9a195e6ec63df067b5f293"
    "mangaorbit.com" = "45ae0fa06758d4f267458e4395df1f4a"
    "mangawhiz.com" = "410df388f4323aa368df07e252b34244"
    "mangaspectra.com" = "8c924bb7f0524342cfe8564572b9ff4e"
    "mangazenith.com" = "9698cfa708a9bf55ff56161d7724e5f4"
    "nebulamanga.com" = "27cac4af00bf9b3647b97413f4ddac15"
    "owlscans.com" = "ebd68f6855b3f6674158b9eee66fdd74"
    "otakureads.com" = "5e55acfc6614f6592b01ff3341ad4a73"
    "pageturnmanga.com" = "b9d7a618786d70b8631cee1b3bfee085"
    "pangeamanga.com" = "7121313e4e94dba3d516bdb972875c3e"
    "quasarreads.com" = "f79e0b0d8507722dff7afb59bd227353"
    "pixelmanga.com" = "dea3d85ce962b8acff4cf53a13f3b1b6"
    "redscans.com" = "e815c570ce8c1c28c04b8bff4eb6b4a3"
    "readmangabliss.com" = "4083ccfffd1a719af57f3859b65add73"
    "scanshub.com" = "60572f7ff93f816c55654e4d79e4e460"
    "starletmanga.com" = "481f6f45b89fdaebeb249f7414e275fe"
    "stellarmanga.com" = "6a57fead2038d5c9d055665e957440f6"
    "waterscans.com" = "c5b3a99afe174f9153f9dd45c8fcf043"
    "whalescans.com" = "8ddffc7fb152a987a95837171f6257be"
  }
}