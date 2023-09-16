import { logger } from './index.js'

export interface FinishParams {
  message?: string
  exitCode?: number
  start?: Date
}

export class Processor {
  private static start = new Date()

  static startJob() {
    logger.info({ message: 'Job has started!', functionName: 'Processor#startJob' })
  }

  static finishJob({ message, exitCode = 0, start = this.start }: FinishParams) {
    const end = new Date()
    const duration = end.getTime() - start.getTime()

    if (message) logger.log('info', { message, functionName: 'Processor#finishJob' })

    logger.log('success', {
      message: `Job has completed successfully in ${duration / 1000} seconds!`,
      start: start.toISOString(),
      end: end.toISOString(),
      duration,
      functionName: 'Processor#finishJob',
    })

    process.exit(exitCode)
  }
}
