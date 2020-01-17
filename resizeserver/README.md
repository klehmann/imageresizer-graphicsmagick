## Scaling server
This directory contains the actual image scaling server, implemented as Node.js application.

## `dockerbuild.sh`
Use this script to build the docker image. The image is based on mindoo/node-graphicsmagick-alpine, so that image needs to be build first.

## `dockerdev.sh`
This runs a container for the image mindoo/node-graphicsmagick-alpine and mounts the Node.js application in directory /app. Use this script when you want to work on the server code.

## `dockerrun.sh`
Contains the code to run the image scaling server in the current directory. Maps the internal port 4000 to the public port 4500.

## URL syntax:
There are two types of URLs, one to resize and another one to crop the image, in the example below to 500px width, 400px height for the file path subdir/DSC00191.JPG.

* [http://localhost:4500/resize/500/400/subdir/DSC00191.JPG](http://localhost:4500/resize/500/400/subdir/DSC00191.JPG)
* [http://localhost:4500/crop/500/400/subdir/DSC00191.JPG](http://localhost:4500/crop/500/400/subdir/DSC00191.JPG)

