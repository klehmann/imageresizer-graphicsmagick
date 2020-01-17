# Image resize server
Contains Dockerfiles to build a Node.js based image resize server which uses GraphicsMagick to return a resized/cropped version of an image in the mapped filesystem.

## Installation
* follow the instructions in directory "node-graphicsmagick" to build a Docker image with Node.js and GraphicsMagick
* now build the Docker image for the image resize server in directory "resizeserver"

## Usage
Run the container with the commands/parameters listed in "resizeserver/dockerrun.sh". This mounts a local directory into the Docker container and starts the server on port 4500.

There are two types of URLs: one to resize and another one to crop the image. In the example below we use with=500px and height=400px and process the image filepath "subdir/DSC00191.JPG" within the image base directory.

* [http://localhost:4500/resize/500/400/subdir/DSC01888.JPG](http://localhost:4500/resize/500/400/subdir/DSC00191.JPG)
* [http://localhost:4500/crop/500/400/subdir/DSC01888.JPG](http://localhost:4500/crop/500/400/subdir/DSC00191.JPG)

## License
The code is available under Apache 2.0 license.

Copyright by [Mindoo GmbH](http://www.mindoo.com)

## Credits
* Node.js server idea and sourcecode are inspired by [this blog article](https://blog.campvanilla.com/nodejs-graphicsmagick-cropping-resizing-server-api-b410fe98e41)
* Dockerfile for the Node.js/GraphicsMagick image is derived from [this file](https://hub.docker.com/r/valdemon/graphicsmagick-node/dockerfile/)

