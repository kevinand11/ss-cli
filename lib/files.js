const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const getAllFilesInADirectory = (directory, store = { files: [], basePath: null }) => {
	if (!store.basePath) store.basePath = path.join(directory)

	const contents = fs.readdirSync(directory)

	contents.forEach((content) => {
		const filePath = path.join(directory, content)
		const stats = fs.statSync(filePath)

		if (stats.isDirectory()) getAllFilesInADirectory(filePath, store)
		else if (stats.isFile()) {
			const splitOnBasePath = filePath.split(store.basePath)
			const currentFileToAdd = splitOnBasePath[1]
			store.files.push(currentFileToAdd)
		}
	})

	return store.files
}

const generateContentFromTemplate = (content, variables) => {
	// add ejs templating logic
	return content
}

const isFileTypeSupported = (file) => {
	const SUPPORTED_FILE_TYPES = ['.js', '.ts', '.txt', '.json']
	const extension = path.extname(file)
	return SUPPORTED_FILE_TYPES.includes(extension)
}

const copyFileContent = (from, to, variables) => {
	if (isFileTypeSupported(from)) {
		const template = fs.readFileSync(from, 'utf8')
		const content = generateContentFromTemplate(template, variables)

		const directory = path.dirname(to)
		if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })

		fs.writeFileSync(to, content, 'utf8')
	} else {
		const message = `${extension} files are not supported. Contact the developer to ask to provide support for such files.`
		console.log(chalk.red(message))
	}
}

const generateFilesFromType = (name, type, category = 'client') => {
	const templatePath = path.join(__dirname, '..', 'templates', type)
	const toFolderPath = path.join(name, category)

	const files = getAllFilesInADirectory(templatePath)

	files.forEach((file) => {
		copyFileContent(path.join(templatePath, file), path.join(toFolderPath, file), { name })
	})
}

exports.generateFilesFromType = generateFilesFromType
