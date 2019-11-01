require('dotenv').config()
// Require File System
const fs = require('fs')
// Require AWS SDK
const AWS = require('aws-sdk')
// Set AWS region
AWS.config.update({ region: 'us-east-1' })
// Create S3 Object instance
const s3 = new AWS.S3()

console.log(s3)

// define bucket based on environment variable
const bucketName = process.env.BUCKET_NAME
console.log(bucketName)

// Access command line arguments to get file path
const filePath = process.argv[2]

// Read the file first
fs.readFile(filePath, (err, fileData) => {
  if (err) throw err

  // create params object for s3 upload
  const params = {
    Bucket: bucketName,
    Key: 'something',
    Body: fileData,
    ACL: 'public-read'
    // ACL: 'public-read-write'
  }

  // upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err

    console.log(s3Data)
  })
})
