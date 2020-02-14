const express = require('express');
const gm = require('gm');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const port = 4000;
const imagesDirIn = '/files';
const tmpImagesDirPathOut = '/tmp/tmpimages';

const app = express();

const createTmpFile = (fileType) => {
  const tmpFileName = 'img_' + new Date().getTime() + '_' + crypto.randomBytes(4).readUInt32LE(0) + '.' + fileType;
  const tmpFilePath = tmpImagesDirPathOut + '/' + tmpFileName;
  return tmpFilePath;
}

const decodeURLParts = (pathStr) => {
  const arrParts = pathStr.split("/");
  for (let i=0; i<arrParts.length; i++) {
    arrParts[i] = decodeURIComponent(arrParts[i]);
  }
  return arrParts.join('/');
}

if (!fs.existsSync(tmpImagesDirPathOut)) {
  fs.mkdirSync(tmpImagesDirPathOut);
}

app.get('/ping', (request, response) => {
  response.send('Pong!');
});

app.get('/resize/:width/:height/:filename*', (request, response) => {
  const { width, height } = request.params;

  let filename = request.params.filename;

  if (!filename) {
    return response.status(400).send({
      message: 'Filename parameter is missing'
    });
  }

  if (request.params.hasOwnProperty('0')) {
    filename = filename + request.params['0'];
  }

  filename = decodeURLParts(filename);

  if (filename.indexOf("..") !== -1 || filename.indexOf(":") !== -1) {
    return response.status(400).send({
      message: 'Invalid filename: ' + filename
    });
  }

  const imgFilePath = path.join(imagesDirIn, filename);

  if (!fs.existsSync(imgFilePath)) {
    return response.status(404).send({
      message: 'Image file not found: ' + filename
    });
  }

  let fileType = request.query.targetformat;
  if (!fileType) {
    const iPos = filename.lastIndexOf('.');
    fileType = iPos==-1 ? "png" : filename.substring(iPos+1).toLowerCase();
  }

  const tmpFilePath = createTmpFile(fileType);

  // Simple checks to see if the value was passed in the url
  // If it wasn't, the value is changed from undefined to null
  //  width = width || null;
  //  height = height || null;

  gm(imgFilePath)
    .setFormat(fileType)
    .resize(width, height)
    .write(tmpFilePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        response.sendFile(tmpFilePath, () => { fs.unlinkSync(tmpFilePath); });
      }
    })
});

app.get('/crop/:width/:height/:filename*', (request, response) => {
  const { width, height } = request.params;

  let filename = request.params.filename;

  if (!filename) {
    return response.status(400).send({
      message: 'Filename parameter is missing'
    });
  }

  if (request.params.hasOwnProperty('0')) {
    filename = filename + request.params['0'];
  }

  filename = decodeURLParts(filename);

  if (filename.indexOf("..") !== -1 || filename.indexOf(":") !== -1) {
    return response.status(403).send({
      message: 'Invalid filename: ' + filename
    });
  }

  const imgFilePath = path.join(imagesDirIn, filename);

  let fileType = request.query.targetformat;
  if (!fileType) {
    const iPos = filename.lastIndexOf('.');
    fileType = iPos==-1 ? "png" : filename.substring(iPos+1).toLowerCase();
  }

  const tmpFilePath = createTmpFile(fileType);

  gm(imgFilePath)
    .setFormat(fileType)
    .crop(width, height)
    .write(tmpFilePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        response.sendFile(tmpFilePath, () => { fs.unlinkSync(tmpFilePath); });
      }
    })
});

app.listen(port, () => {
  console.log(`Image resize server is running...`);
});
