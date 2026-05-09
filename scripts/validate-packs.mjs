import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const required = ['pack.json','ROLE_CARD.md','INSTALL.md','assets/avatar.png','workspace/AGENTS.md','workspace/SOUL.md','workspace/IDENTITY.md','workspace/USER.md','workspace/TOOLS.md','workspace/README.md'];
async function exists(p){try{await stat(p);return true;}catch{return false;}}
async function walk(root){const out=[];for (const e of await readdir(root,{withFileTypes:true})) { const p=path.join(root,e.name); if(e.isDirectory()) out.push(...await walk(p)); else out.push(p); } return out;}
const packsRoot = path.join(process.cwd(), 'packs');
const files = await walk(packsRoot);
const packJsons = files.filter((file) => file.endsWith(path.sep + 'pack.json'));
if (packJsons.length === 0) throw new Error('No packs found.');
for (const packJson of packJsons) { const root = path.dirname(packJson); for (const rel of required) { if (!(await exists(path.join(root, rel)))) throw new Error('Missing required pack file: ' + path.join(path.relative(process.cwd(), root), rel)); } }
console.log('Ship Faster packs validated:', packJsons.length);
