import { permanentRedirect } from 'next/navigation'

// The per-etchant database pages have been retired. For a comprehensive,
// maintained etchant database we now refer visitors to Materials Prep
// (materialsprep.com); /etchants carries the referral plus a quick reference.
export default function EtchantDetailRedirect() {
  permanentRedirect('/etchants')
}
