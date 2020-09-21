import { extname, join } from 'path'
import { getAllFilesInADirectory } from './utils/fetchAllFilesInDirectory'
import { readContentFromFile } from './utils/readContentFromFile'
import { generateContentFromTemplate } from './utils/generateContentFromTemplate'
import { isFileTypeSupported } from './utils/isFileTypeSupported'
import { writeContentToFile } from './utils/writeContentToFile'
import * as chalk from 'chalk'

export const generateFilesFromType = (name: string, type: string, category: string = 'client') => {
	const templatePath = join(__dirname, '..', 'templates', type)
	const files = getAllFilesInADirectory(templatePath)

	files.forEach((file) => {
		const fromPath = join(templatePath, file)
		const fileIsSupported = isFileTypeSupported(fromPath)

		if(fileIsSupported){
			const template = readContentFromFile(fromPath)

			const variables = { name }
			const content = generateContentFromTemplate(template, variables)

			const toPath = join(name, category, file)
			writeContentToFile(toPath, content)
		}else {
			const extension = extname(fromPath)
			const message = `${extension} files are not supported. Contact the developer to ask to provide support for such files.`
			console.log(chalk.red(message))
		}
	})
}
