import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = process.env.PORT || 8080

const app = express()

// Serve the built static assets (JS, CSS, etc.)
app.use(express.static(distDir))

// SPA fallback: any route not matched above returns index.html so that
// React Router (BrowserRouter) can handle client-side routing / deep links.
app.use((_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
