#!/bin/sh

INFILE=$1
BASE=$2
OUTDIR=$3

mkdir -p ${OUTDIR}

ffmpeg -y -i ${INFILE} \
  -c:v libx264 -crf 22 -profile:v baseline \
  -pix_fmt yuv420p -movflags +faststart \
  ${OUTDIR}/${BASE}.mp4
ffmpeg -y -i ${INFILE} \
  -c:v libvpx-vp9 -crf 22 \
  -deadline realtime -cpu-used -5 \
  -c:a libvorbis -q:a 4 \
  ${OUTDIR}/${BASE}.webm
ffmpeg -y -i ${INFILE} -vframes 1 ${OUTDIR}/${BASE}.jpg
ffmpeg -y -i ${INFILE} -vframes 1 ${OUTDIR}/${BASE}.png
