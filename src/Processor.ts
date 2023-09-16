import { logger } from './index.js'

export interface FinishParams {
  message?: string
  exitCode?: number
  start?: Date
}

export class Processor {
  private static start = new Date()

  static async startJob() {
    logger.info({
      message: `Job has started at ${this.start.toISOString()}!`,
      functionName: 'Processor#startJob',
    })
  }

  static async finishJob(message?: string) {
    const end = new Date()
    const duration = end.getTime() - this.start.getTime()

    if (message) logger.log('info', { message, functionName: 'Processor#finishJob' })

    logger.log('success', {
      message: `✅ Job has completed successfully in ${duration / 1000} seconds!`,
      start: this.start.toISOString(),
      end: end.toISOString(),
      duration,
      functionName: 'Processor#finishJob',
    })

    process.exit(0)
  }
    process.exit(exitCode)
  }
}
