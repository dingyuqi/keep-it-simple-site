import { readFileSync, writeFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))

const PINNED = {
  vuepress: '2.0.0-rc.30',
  '@vuepress/bundler-vite': '2.0.0-rc.30',
}

for (const [name, version] of Object.entries(PINNED)) {
  if (pkg.devDependencies?.[name]) pkg.devDependencies[name] = version
  if (pkg.dependencies?.[name]) pkg.dependencies[name] = version
}

writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
console.log('Pinned vuepress & bundler-vite to 2.0.0-rc.30')