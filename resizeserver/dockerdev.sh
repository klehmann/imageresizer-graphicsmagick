#!/bin/sh
echo Running mindoo/node-graphicsmagick-alpine with mounted app directory
docker run --rm -it -v $PWD/app:/app -v $PWD/files:/files -v $PWD/tmp:/tmp/tmpimages -p 4500:4000 mindoo/node-graphicsmagick-alpine:13-1.3.30-3.10 bash

