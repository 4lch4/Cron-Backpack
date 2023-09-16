import { config } from 'dotenv'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { SimpleObject, logger } from './index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function loadConfig(
  keys: SimpleObject,
  path: string = join(__dirname, '..', '.env')
): SimpleObject {
  // Load the .env file to ensure that the environment variables are available, if they're present.
  config({ path })

  // Validate the config before loading & returning it.
  if (!validateConfig(keys)) throw new Error(`[Config#loadConfig]: Invalid config!`)

  const returnConfig: SimpleObject = {}

  for (const key of Object.keys(keys)) {
    const envVar = process.env[keys[key]]

    // I use the non-null assertion operator (!) here because we've already validated the config.
    returnConfig[key] = envVar!
  }

  return returnConfig
}

export function validateConfig(keys: SimpleObject): boolean {
  let valid = true

  for (const keyName of Object.keys(keys)) {
    if (!process.env[keys[keyName]]) {
      logger.error({
        message: `Required environment variable ${keyName} with name ${keys[keyName]} not found!`,
        functionName: 'Config#validateConfig',
      })

      valid = false
    }
  }

  return valid
}
