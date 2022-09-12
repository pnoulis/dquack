import { spawn } from 'node:child_process';


async function execute(program, argv, done) {
  if (typeof argv === 'function') {
    done = argv;
  }

}