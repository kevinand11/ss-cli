import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { dirname } from 'path'

export const writeContentToFile = (path: string, content: string) => {
	const directory = dirname(path)
	if (!existsSync(directory)) mkdirSync(directory, { recursive: true })

	writeFileSync(path, content, 'utf8')
}
