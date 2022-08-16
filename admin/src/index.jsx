import { createRoot } from 'react-dom/client'
import HentityAdmin from 'HentityAdmin'
import 'index.css'

const run = async () => {
  const hentityAdmin = new HentityAdmin()
  await hentityAdmin.init()

  const root = createRoot(document.getElementById('root'))
  root.render(hentityAdmin.render())
}

run()
