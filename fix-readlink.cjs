const fs = require('fs');
const { PassThrough } = require('stream');

// 1. Fix for Windows mounted/exFAT drives (like I:\) where readlink throws EISDIR instead of EINVAL on normal files
const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  const cb = typeof options === 'function' ? options : callback;
  const opts = typeof options === 'function' ? undefined : options;
  return origReadlink.call(fs, path, opts, (err, linkString) => {
    if (err && err.code === 'EISDIR') {
      err.code = 'EINVAL';
      err.errno = -4071;
    }
    if (cb) cb(err, linkString);
  });
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      if (err && err.code === 'EISDIR') {
        err.code = 'EINVAL';
        err.errno = -4071;
      }
      throw err;
    }
  };
}

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    if (err && err.code === 'EISDIR') {
      err.code = 'EINVAL';
      err.errno = -4071;
    }
    throw err;
  }
};

// 2. Fix for Next.js telemetry trace file EPERM on mounted I:\ drive
const origCreateWriteStream = fs.createWriteStream;
fs.createWriteStream = function (path, options) {
  if (typeof path === 'string' && (path.endsWith('\\trace') || path.endsWith('/trace'))) {
    const dummy = new PassThrough();
    dummy.flush = () => {};
    return dummy;
  }
  return origCreateWriteStream.call(fs, path, options);
};
