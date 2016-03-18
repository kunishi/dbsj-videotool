#!/bin/sh

INFILE=$1
BASE=$2
OUTDIR=$3

mkdir -p ${OUTDIR}

ffmpeg -y -i ${INFILE} -vcodec libx264 -pix_fmt yuv420p -profile:v baseline \
  -preset slow -crf 22 -movflags +faststart ${OUTDIR}/${BASE}.mp4
ffmpeg -y -i ${INFILE} -c:v libvpx -qmin 10 -qmax 42 -c:a libvorbis -q:a 4 ${OUTDIR}/${BASE}.webm
ffmpeg -y -i ${INFILE} -vframes 1 ${OUTDIR}/${BASE}.jpg
ffmpeg -y -i ${INFILE} -vframes 1 ${OUTDIR}/${BASE}.png
