import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'smc')
fs.mkdirSync(OUT_DIR, { recursive: true })

async function download(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dest = path.join(OUT_DIR, filename)
    if (fs.existsSync(dest)) {
      console.log(`  SKIP (exists): ${filename}`)
      resolve()
      return
    }
    const file = fs.createWriteStream(dest)
    const client = url.startsWith('https') ? https : http
    const req = client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        try { fs.unlinkSync(dest) } catch {}
        download(res.headers.location!, filename).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        file.close()
        try { fs.unlinkSync(dest) } catch {}
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        console.log(`  OK: ${filename}`)
        resolve()
      })
    })
    req.on('error', (err) => {
      try { fs.unlinkSync(dest) } catch {}
      reject(err)
    })
  })
}

// ── Image map ─────────────────────────────────────────────────────────────────
// Format: [sourceUrl, seoFilename, altText]
// Filenames follow: [market]-[lake]-[product-type]-[descriptor]-[seq].jpg
// Alt text follows: [Product/location] [installed/on] [lake], [market], Wisconsin
const IMAGES: [string, string, string][] = [

  // ── SMC Logo ─────────────────────────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/a812e67f-664b-46fe-abe8-869bda0565bd/SMC_logo_%5Bhorizontal-white-red%5D.png?format=2500w',
    'summerset-marine-construction-logo.png',
    'Summerset Marine Construction logo'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/4e3e5f37-3584-4f55-a42f-e54f5a3d5d4a/SMC_logo%5Bwhite%5D.png?format=2500w',
    'summerset-marine-construction-logo-white.png',
    'Summerset Marine Construction logo white'
  ],

  // ── Home page ────────────────────────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5682bbe1-e7bf-4fcc-8be1-f9fd7232c568/Lifetime+Pier+at+Sunrise.jpg?format=2500w',
    'wisconsin-permanent-pier-sunrise-hero-001.jpg',
    'Lifetime permanent pier at sunrise on a Wisconsin lake — Summerset Marine Construction'
  ],

  // ── About / company ──────────────────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/c6a89c2b-9c62-4a2d-b7f1-1957928bcc94/whitewater+office+building+-+aerial+view.JPG?format=2500w',
    'summerset-marine-construction-whitewater-wi-headquarters-001.jpg',
    'Summerset Marine Construction headquarters in Whitewater, Wisconsin'
  ],

  // ── Permanent Piers — All Seasons HD ────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/1ea26ed0-46e0-45a1-a58c-9d287c137376/DJI_0195+copy.jpg?format=2500w',
    'wisconsin-lifetime-all-seasons-hd-pier-aerial-001.jpg',
    'Lifetime All Seasons HD permanent pier aerial view — Summerset Marine Construction Wisconsin'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5335083e-260e-43b5-a83f-613855e49be7/lifetime+all+seasons+hd+pier+-+oconomowoc+lake.jpg?format=2500w',
    'oconomowoc-okauchee-lake-lifetime-all-seasons-hd-pier-001.jpg',
    'Lifetime All Seasons HD permanent pier installed on Okauchee Lake, Oconomowoc, Wisconsin'
  ],

  // ── Permanent Piers — All Seasons ────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/36bbc7dc-3147-449a-a037-189d5b453be1/lifetime+all+seasons+pier+-+upper+nemahbin.jpg?format=2500w',
    'oconomowoc-nagawicka-lake-lifetime-all-seasons-pier-001.jpg',
    'Lifetime All Seasons permanent pier installed on Nagawicka Lake, Oconomowoc, Wisconsin'
  ],

  // ── Permanent Piers — Classic / Minimalist (shared hero) ─────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/1ea26ed0-46e0-45a1-a58c-9d287c137376/DJI_0195+copy.jpg?format=2500w',
    'wisconsin-lifetime-classic-pier-aerial-001.jpg',
    'Lifetime Classic permanent pier aerial view — Summerset Marine Construction Wisconsin'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5682bbe1-e7bf-4fcc-8be1-f9fd7232c568/Lifetime+Pier+at+Sunrise.jpg?format=2500w',
    'wisconsin-lifetime-minimalist-pier-sunrise-001.jpg',
    'Lifetime Minimalist permanent pier at sunrise — Summerset Marine Construction Wisconsin'
  ],

  // ── Boat & PWC Lifts ──────────────────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/6eaa3a58-661d-4671-aaf9-d7204d9d7dcb/AdobeStock_475639845.jpeg?format=2500w',
    'wisconsin-lifetime-built-in-boat-lift-001.jpg',
    'Lifetime built-in boat lift installed on a Wisconsin lake — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/7a80fa80-8817-4fb9-bca9-e9289c9654cc/AdobeStock_144313980.jpeg?format=2500w',
    'wisconsin-lifetime-standalone-boat-lift-001.jpg',
    'Lifetime standalone boat lift installed on a Wisconsin lake — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/78cb03f4-d058-4108-995f-451d26b2ff23/AdobeStock_1769177569.png?format=2500w',
    'wisconsin-lifetime-pwc-jet-ski-lift-001.jpg',
    'Lifetime PWC jet ski lift installed on a Wisconsin lake — Summerset Marine Construction'
  ],

  // ── Lake Geneva market ────────────────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5682bbe1-e7bf-4fcc-8be1-f9fd7232c568/Lifetime+Pier+at+Sunrise.jpg?format=2500w',
    'lake-geneva-permanent-pier-sunrise-001.jpg',
    'Permanent pier at sunrise on Geneva Lake, Lake Geneva, Wisconsin — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/1ea26ed0-46e0-45a1-a58c-9d287c137376/DJI_0195+copy.jpg?format=2500w',
    'lake-geneva-geneva-lake-permanent-pier-aerial-001.jpg',
    'Permanent pier aerial view on Geneva Lake, Lake Geneva, Wisconsin — Summerset Marine Construction'
  ],

  // ── Oconomowoc / Lake Country market ─────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5335083e-260e-43b5-a83f-613855e49be7/lifetime+all+seasons+hd+pier+-+oconomowoc+lake.jpg?format=2500w',
    'oconomowoc-okauchee-lake-permanent-pier-hero-001.jpg',
    'Permanent pier on Okauchee Lake, Oconomowoc, Wisconsin — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/36bbc7dc-3147-449a-a037-189d5b453be1/lifetime+all+seasons+pier+-+upper+nemahbin.jpg?format=2500w',
    'oconomowoc-beaver-lake-permanent-pier-001.jpg',
    'Permanent pier on Beaver Lake, Oconomowoc, Wisconsin — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5682bbe1-e7bf-4fcc-8be1-f9fd7232c568/Lifetime+Pier+at+Sunrise.jpg?format=2500w',
    'oconomowoc-lac-la-belle-permanent-pier-001.jpg',
    'Permanent pier on Lac La Belle, Oconomowoc, Wisconsin — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/1ea26ed0-46e0-45a1-a58c-9d287c137376/DJI_0195+copy.jpg?format=2500w',
    'oconomowoc-nagawicka-lake-permanent-pier-aerial-001.jpg',
    'Permanent pier aerial view on Nagawicka Lake, Oconomowoc, Wisconsin — Summerset Marine Construction'
  ],

  // ── Door County market ────────────────────────────────────────────────────────
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/1ea26ed0-46e0-45a1-a58c-9d287c137376/DJI_0195+copy.jpg?format=2500w',
    'door-county-green-bay-permanent-pier-aerial-001.jpg',
    'Permanent pier aerial view on Green Bay, Door County, Wisconsin — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/d837ec1a-c458-455f-9748-fe44beb21d68/Sunlight+beams+through+crystal-clear+freshwater%2C+illuminating+the+underwater+environment+and+showcasing+the+exceptional+clarity+and+beauty+of+a+Wisconsin+lake..jpeg?format=2500w',
    'door-county-sturgeon-bay-wisconsin-lake-001.jpg',
    'Clear Wisconsin waterway in Door County — Summerset Marine Construction'
  ],
  [
    'https://images.squarespace-cdn.com/content/v1/671595d748a4623336b2fea8/5682bbe1-e7bf-4fcc-8be1-f9fd7232c568/Lifetime+Pier+at+Sunrise.jpg?format=2500w',
    'door-county-lake-michigan-permanent-pier-001.jpg',
    'Permanent pier on Lake Michigan, Door County, Wisconsin — Summerset Marine Construction'
  ],
]

// ── Run ────────────────────────────────────────────────────────────────────────
console.log(`\nDownloading ${IMAGES.length} images to public/images/smc/\n`)
let ok = 0; let fail = 0
for (const [url, filename] of IMAGES) {
  console.log(`Fetching → ${filename}`)
  try {
    await download(url, filename)
    ok++
  } catch (err) {
    console.error(`  FAILED: ${filename} — ${err}`)
    fail++
  }
}
console.log(`\nComplete: ${ok} succeeded, ${fail} failed`)
console.log('Images saved to: artifacts/summerset-marine/public/images/smc/')

// Write an image manifest for reference
const manifest = IMAGES.map(([url, filename, alt]) => ({ filename, alt, url }))
fs.writeFileSync(
  path.join(OUT_DIR, '_manifest.json'),
  JSON.stringify(manifest, null, 2)
)
console.log('Manifest written to public/images/smc/_manifest.json')
