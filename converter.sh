#!/bin/sh

PROGNAME=$(basename $0)

usage() {
  echo "Usage: $PROGNAME [-m] [-w] [-i] INFILE BASE OUTDIR"
  echo "Options:"
  echo "  -h: show this help"
  echo "  -m: encode H.264"
  echo "  -w: encode WebM"
  echo "  -i: generate screenshots (both Jpeg and PNG)"
  echo
  exit 1
}

for OPT in "$@"; do
  case "$OPT" in
  '-h' )
    usage
    exit 1
    ;;
  '-m' )
    ENC_H264=1
    shift
    ;;
  '-w' )
    ENC_WEBM=1
    shift
    ;;
  '-i' )
    ENC_IMG=1
    shift
    ;;
  *)
    param=("$@")
    ;;
  esac
done

if [ "$ENC_H264" != 1 -a "$ENC_WEBM" != 1 -a "$ENC_IMG" != 1 ]; then
  ENC_H264=1
  ENC_WEBM=1
  ENC_IMG=1
fi

INFILE=${param[0]}
BASE=${param[1]}
OUTDIR=${param[2]}

mkdir -p ${OUTDIR}

if [ "$ENC_H264" = 1 ]; then
  ffmpeg -y -i ${INFILE} \
    -c:v libx264 -crf 22 -profile:v baseline \
    -pix_fmt yuv420p -movflags +faststart \
    ${OUTDIR}/${BASE}.mp4
fi

if [ "$ENC_WEBM" = 1 ]; then
  ffmpeg -y -i ${INFILE} \
    -c:v libvpx -crf 22 \
    -deadline realtime -cpu-used -8 -threads 5 \
    -c:a libvorbis -q:a 4 \
    ${OUTDIR}/${BASE}.webm
fi

if [ "$ENC_IMG" = 1 ]; then
  ffmpeg -y -i ${INFILE} -vframes 1 ${OUTDIR}/${BASE}.jpg
  ffmpeg -y -i ${INFILE} -vframes 1 ${OUTDIR}/${BASE}.png
fi
