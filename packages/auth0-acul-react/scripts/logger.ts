import chalk from 'chalk';

type LogType = 'success' | 'error' | 'warn' | 'info' | 'heading' | 'debug';

const styles: Record<LogType, (msg: string) => string> = {
  success: (msg) => chalk.green(`✅ ${msg}`),
  error:   (msg) => chalk.red(`❌ ${msg}`),
  warn:    (msg) => chalk.yellow(`⚠️  ${msg}`),
  info:    (msg) => chalk.cyan(`ℹ️  ${msg}`),
  heading: (msg) => chalk.bold.magenta(`▶ ${msg}`),
  debug:   (msg) => chalk.gray(`… ${msg}`),
};

function log(type: LogType, msg: string, newLine = false): void {
  const output = styles[type](msg);
  if (newLine) {
    console.log(`\n${output}\n`);
  } else {
    console.log(output);
  }
}

export const logger = {
  success: (msg: string, newLine = false) => log('success', msg, newLine),
  error:   (msg: string, newLine = false) => log('error', msg, newLine),
  warn:    (msg: string, newLine = false) => log('warn', msg, newLine),
  info:    (msg: string, newLine = false) => log('info', msg, newLine),
  heading: (msg: string, newLine = false) => log('heading', msg, newLine),
  debug:   (msg: string, newLine = false) => log('debug', msg, newLine),
};
