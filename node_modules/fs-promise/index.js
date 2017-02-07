'use strict'

var mzfs = require('mz/fs')
var fsExtra = require('fs-extra')
var Promise = require('any-promise')
var thenifyAll = require('thenify-all')
var slice = Array.prototype.slice

// thenify-all for all fs-extra that make sense to be promises
var fsExtraKeys = [
  'copy',
  'emptyDir',
  'ensureFile',
  'ensureDir',
  'ensureLink',
  'ensureSymlink',
  'mkdirs',
  'move',
  'outputFile',
  'outputJson',
  'readJson',
  'remove',
  'writeJson',
  // aliases
  'createFile',
  'createLink',
  'createSymlink',
  'emptydir',
  'mkdirp',
  'readJSON',
  'outputJSON',
  'writeJSON'
]
thenifyAll.withCallback(fsExtra, exports, fsExtraKeys)

// Delegate all normal fs to mz/fs
// (this overwrites anything proxies directly above)
var mzKeys = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile',
  'access',
  'exists'
]
mzKeys.forEach(function(key){
  exports[key] = mzfs[key]
})


// Resolve fs-extra streams as Promise for array
var streamKeys = [
  'walk'
]

streamKeys.forEach(function(key){
  exports[key] = function(){
    var func = fsExtra[key]
    var args = slice.call(arguments)

    return new Promise(function(resolve, reject){
      var stream = func.apply(fsExtra, args)
      var items = []

      stream
        .on('data', function(item){
          items.push(item)
        })
        .on('end', function(){
          resolve(items)
        })
        .on('error', function(error){
          reject(error)
        })
    })
  }
})
