import { WinstonTransport } from '@axiomhq/winston'
import { arch, platform } from 'os'
import Winston, { transports as WinstonTransports } from 'winston'

const transports: Winston.transport[] = [
  new WinstonTransports.Console({
    format: Winston.format.combine(
      Winston.format.colorize({ colors: { success: 'green', info: 'gray' } }),
      Winston.format.simple()
    ),
  }),
]

// Ensure that we only log to Axiom if all required environment variables are set.
if (process.env.AXIOM_DATA_SET && process.env.AXIOM_TOKEN && process.env.AXIOM_ORG_ID) {
  transports.push(
    new WinstonTransport({
      dataset: process.env.AXIOM_DATA_SET,
      token: process.env.AXIOM_TOKEN,
      orgId: process.env.AXIOM_ORG_ID,
    })
  )
}

export const logger = Winston.createLogger({
  defaultMeta: {
    service: process.env.JOB_NAME || '@4lch4/cron-logger',
    nodeEnv: process.env.NODE_ENV || 'development',
    hostname: process.env.HOSTNAME || 'localhost',
    arch: arch(),
    platform: platform(),
  },
  level: process.env.LOG_LEVEL || process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: { ...Winston.config.npm.levels, success: -1 },
  transports,
})
