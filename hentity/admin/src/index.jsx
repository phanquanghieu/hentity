import { createRoot } from 'react-dom/client'
import 'index.css'

const run = async () => {
  const HentityAdmin = (await import('HentityAdmin')).default

  const hentityAdmin = new HentityAdmin()
  await hentityAdmin.init()

  const root = createRoot(document.getElementById('root'))
  root.render(hentityAdmin.render())
}

run()
