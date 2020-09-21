import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export const getAllFilesInADirectory = (directory: string, store: { files: string[], basePath: string} = { files: [], basePath: '' }) => {
	if (!store.basePath) store.basePath = join(directory)

	const contents = readdirSync(directory)

	contents.forEach((content) => {
		const filePath = join(directory, content)
		const stats = statSync(filePath)

		if (stats.isDirectory()) getAllFilesInADirectory(filePath, store)
		else if (stats.isFile()) {
			const splitOnBasePath = filePath.split(store.basePath)
			const currentFileToAdd = splitOnBasePath[1]
			store.files.push(currentFileToAdd)
		}
	})

	return store.files
}
