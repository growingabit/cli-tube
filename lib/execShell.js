const child_process = require('child_process');

const opts = {
  stdio: 'pipe',
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
};

function async(cmd, callback) {
  child_process.exec(cmd, opts, (err, stdout, stderr) => {
    if (err) {
      console.error(`exit code: ${err.code} (${err.signal})\nexec error: ${err}`);
      return callback(err);
    }
    callback(null, stdout, stderr);
  });
}

function sync(cmd) {
  try {
    let cp = child_process.execSync(cmd, opts);
    return {
      err: null,
      status: cp.status,
      stdout: cp.stdout,
      stderr: cp.stderr
    };
  } catch (e) {
    return {
      err: e,
      status: e.status,
      stdout: e.stdout,
      stderr: e.stderr
    };
  }
}

module.exports = {
  async: async,
  sync: sync
};
