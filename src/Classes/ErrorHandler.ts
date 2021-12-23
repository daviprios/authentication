import fs from 'fs'
import path from 'path'

enum ErrorType{
  DATABASE_DUPLICATE,
  UNKNOWN
}

class ErrorHandler{
  constructor(errorType: ErrorType, error: string | object){
    this.CreateFolderIfNotExist(this.errorFolderPath)
    const errorFilename = `${new Date().getUTCDate()} - ${errorType}`
    if(typeof(error) === 'object') error = JSON.stringify(error)
    fs.writeFileSync(path.resolve(this.errorFolderPath, errorFilename), error, { encoding: 'ascii' })
  }

  private logFolderPath = path.resolve('..', 'logs')
  private errorFolderPath = path.resolve(this.logFolderPath, 'errors')

  private CreateFolderIfNotExist(absolutePath: string){
    if(!fs.existsSync(absolutePath)) fs.mkdirSync(absolutePath, { recursive: true })
  }
}

export default ErrorHandler
export { ErrorType }