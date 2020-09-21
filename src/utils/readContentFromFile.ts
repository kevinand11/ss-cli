import { readFileSync } from 'fs'

export const readContentFromFile = (path: string) => {
	return readFileSync(path, 'utf8')
}
