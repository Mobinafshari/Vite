import fs from 'fs'
import path from 'path'
import { parse } from 'acorn'

const moduleGraph = new Map()

function getStaticImports(code) {
  const ast = parse(code, { sourceType: 'module', ecmaVersion: 'latest' })
  const imports = []

  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      imports.push(node.source.value) 
    }
  }
  
  return imports
}

function buildGraph(filePath, rootDir = process.cwd()) {
    const fullPath = path.resolve(rootDir, filePath)
    if (moduleGraph.has(fullPath)) return
    
    const code = fs.readFileSync(fullPath, 'utf-8')
    const imports = getStaticImports(code)
    
    moduleGraph.set(fullPath, { deps: [], dependents: [] })
    
    for (const importPath of imports) {
        const resolvedPath = path.resolve(path.dirname(fullPath), importPath)
    moduleGraph.get(fullPath).deps.push(resolvedPath)

    if (!moduleGraph.has(resolvedPath)) {
      buildGraph(resolvedPath, rootDir)
    }

    const depEntry = moduleGraph.get(resolvedPath)
    depEntry.dependents.push(fullPath)
  }
}



export { buildGraph, moduleGraph }
