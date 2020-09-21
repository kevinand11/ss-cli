import { extname } from 'path'

export const isFileTypeSupported = (file: string) => {
	const SUPPORTED_FILE_TYPES = ['.js', '.ts', '.txt', '.json']
	const extension = extname(file)
	return SUPPORTED_FILE_TYPES.includes(extension)
}
