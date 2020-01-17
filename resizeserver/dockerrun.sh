#!/bin/sh
echo Starting resize server on port 4500
docker run --rm -it -v $PWD/files:/files -v $PWD/tmp:/tmp/tmpimages -p 4500:4000 mindoo/image-resize-server:graphicsmagick-1.0.0

