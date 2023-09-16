import PQueue from 'p-queue'
import { logger } from './index.js'

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

  static async finishQueue(queue: PQueue) {
    queue.on('empty', () => {
      if (queue.size === 0) this.finishJob()
    })
  }

  static async failJob(error: string | Error, exitCode: number = 1) {
    let message = '❌ '

    if (typeof error === 'string') {
      message += `The job has failed with the following message: ${error}`
    } else {
      message += `The job has failed with the following error message: ${error.message}`
    }

    logger.log('error', { message, functionName: 'Processor#failJob', error })

    process.exit(exitCode)
  }
}
