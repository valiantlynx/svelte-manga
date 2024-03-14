resource "cloudflare_record" "ec2_dns_a" {
  for_each = var.cloudflare_zone_ids
  zone_id  = each.value
  name     = each.key
  value    = var.public_ip[0]
  type     = "A"
  ttl      = 1 // Auto
  proxied  = false
}

resource "cloudflare_record" "ec2_dns_cname" {
  for_each = var.cloudflare_zone_ids
  zone_id  = each.value
  name     = "www.${each.key}"
  value    = each.key
  type     = "CNAME"
  ttl      = 1 // Auto
  proxied  = false
}
