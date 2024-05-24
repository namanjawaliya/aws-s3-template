// Import the AWS SDK
const AWS = require("aws-sdk");
const fs = require("fs");

// Configure the AWS SDK with your access and secret key (Use environment variables for security)
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-south-1", // e.g., 'us-west-2'
});

// Create an S3 service object
const s3 = new AWS.S3();

// Function to upload a file to a specified bucket
const uploadFile = async (bucketName, filePath, objectKey) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: fileContent,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};

// Function to download a file from a specified bucket
const downloadFile = async (bucketName, objectKey, downloadPath) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3.getObject(params).promise();
    fs.writeFileSync(downloadPath, data.Body.toString());
    console.log("File downloaded successfully:", downloadPath);
  } catch (err) {
    console.error("Error downloading file:", err);
  }
};

// Function to list objects in a specified bucket
const listObjects = async (bucketName) => {
  const params = {
    Bucket: bucketName,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    console.log("Objects in bucket:", data.Contents);
  } catch (err) {
    console.error("Error listing objects:", err);
  }
};

// Usage
const bucketName = "csewhy-products"; // Replace with your bucket name
const uploadFilePath = "hello.txt"; // Replace with the file path you want to upload
const downloadFilePath = "downloaded-hello.txt"; // Replace with the file path you want to download to
const objectKey = "hello.txt"; // Replace with your object key

// Upload a file to the bucket
// uploadFile(bucketName, uploadFilePath, objectKey);

// Download a file from the bucket
// downloadFile(bucketName, objectKey, downloadFilePath);

// List objects in the bucket
// listObjects(bucketName);
