import { permanentRedirect } from 'next/navigation'

// The database-backed etchant selector has been retired. The /etchants page
// carries a common-etchant quick reference and refers visitors to the
// Materials Prep etchant database (materialsprep.com) for full coverage.
export default function EtchantSelectorRedirect() {
  permanentRedirect('/etchants')
}
