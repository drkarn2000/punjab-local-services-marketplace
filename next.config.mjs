import fs from 'fs';

// Fix for Windows mounted/exFAT drives (like I:\) where readlink throws EISDIR instead of EINVAL on normal files
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.VERCEL ? '.next' : '.next-app',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
