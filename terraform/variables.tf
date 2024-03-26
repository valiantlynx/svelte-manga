variable "vpc_cidr" {
  description = "VPC CIDR Range"
  type = string
}

variable "subnet_cidr" {
    description = "Subnet CIDRS"
    type = list(string)
}

variable "cloudflare_zone_ids" {
  description = "Map of domain to Cloudflare zone IDs, subdomains, service routing, and inclusion flags"
  type = map(object({
    zone_id            = string
    service            = optional(string)
    port               = optional(number)
    subdomains         = list(object({
      name             = string
      service          = string
      port             = number
    }))
    include_root       = bool
    include_subdomains = bool
  }))
  default = {
    "animevariant.com" = {
      zone_id = "e2348ce2e55eafb8317c9a111450b6b4",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "astromanga.com" = {
      zone_id = "b240f1f918bbc994dc53a9a9940ba321",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "auramanga.com" = {
      zone_id = "af9e01fbe3661f4df40b7d29aeb9aa9a",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "comicbreeze.com" = {
      zone_id = "b873248295e363bb48df041a63b6fd8c",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "comicharbor.com" = {
      zone_id = "7a12ce251110331ca06d29a6974b2185",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "ghostscans.com" = {
      zone_id = "0cfb6927807213ea51e5c3c3dda00f5f",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "ethermanga.com" = {
      zone_id = "cb47acbf10fe8ee7b50afdca0190001c",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "knightscans.com" = {
      zone_id = "93e68927da0fc2abf78d416b4e8a0075",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangaburst.com" = {
      zone_id = "ddc96c37024f67513a269017562e4acc",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangafable.com" = {
      zone_id = "8cfdbd80b5a6f50aa2f1e50ae2fb69b3",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangacrest.com" = {
      zone_id = "423f67fe279a9398e2b1e8719c91e8e6",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangaloom.com" = {
      zone_id = "10a34c581e9a195e6ec63df067b5f293",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangaorbit.com" = {
      zone_id = "45ae0fa06758d4f267458e4395df1f4a",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangawhiz.com" = {
      zone_id = "410df388f4323aa368df07e252b34244",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangaspectra.com" = {
      zone_id = "8c924bb7f0524342cfe8564572b9ff4e",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "mangazenith.com" = {
      zone_id = "9698cfa708a9bf55ff56161d7724e5f4",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "nebulamanga.com" = {
      zone_id = "27cac4af00bf9b3647b97413f4ddac15",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "owlscans.com" = {
      zone_id = "ebd68f6855b3f6674158b9eee66fdd74",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "otakureads.com" = {
      zone_id = "5e55acfc6614f6592b01ff3341ad4a73",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "pageturnmanga.com" = {
      zone_id = "b9d7a618786d70b8631cee1b3bfee085",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "pangeamanga.com" = {
      zone_id = "7121313e4e94dba3d516bdb972875c3e",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "quasarreads.com" = {
      zone_id = "f79e0b0d8507722dff7afb59bd227353",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "pixelmanga.com" = {
      zone_id = "dea3d85ce962b8acff4cf53a13f3b1b6",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "redscans.com" = {
      zone_id = "e815c570ce8c1c28c04b8bff4eb6b4a3",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "scanshub.com" = {
      zone_id = "60572f7ff93f816c55654e4d79e4e460",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "starletmanga.com" = {
      zone_id = "481f6f45b89fdaebeb249f7414e275fe",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "stellarmanga.com" = {
      zone_id = "6a57fead2038d5c9d055665e957440f6",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "waterscans.com" = {
      zone_id = "c5b3a99afe174f9153f9dd45c8fcf043",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    },
    "whalescans.com" = {
      zone_id = "8ddffc7fb152a987a95837171f6257be",
      service = "svelte-manga",
      port = 3000,
      subdomains = [
        {
          name    = "www",
          service = "svelte-manga",
          port    = 3000
        },
        {
          name    = "ass",
          service = "svelte-manga",
          port    = 3000
        }
      ],
      include_root = true,
      include_subdomains = true
    }
  }
}


