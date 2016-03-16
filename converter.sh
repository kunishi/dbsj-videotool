#!/bin/sh

INFILE=$1
BASE=$2
OUTDIR=$3
W=$4
H=$5

mkdir -p ${OUTDIR}

#ffmpeg2theora --videobitrate 256 --max_size ${W}x${H} --two-pass --output ${OUTDIR}/${BASE}.ogv ${INFILE}
#HandBrakeCLI --preset 'AppleTV' --width ${W} --height ${H} --turbo --optimize --crop 0:0:0:0 --input ${INFILE} --output ${OUTDIR}/${BASE}.mp4
ffmpeg -i ${INFILE} -vcodec libx264 -pix_fmt yuv420p -profile:v baseline \
  -preset slow -crf 22 -movflags +faststart ${OUTDIR}/${BASE}.mp4
#ffmpeg -pass 1 -passlogfile ${INFILE} -threads 16 -keyint_min 0 -g 250 -b 614400 -skip_threshold 0 -qmin 1 -qmax 51 -i ${INFILE} -vcodec libvpx -s ${W}x${H} -an -f webm -y /dev/null
#ffmpeg -pass 2 -passlogfile ${INFILE} -threads 16 -keyint_min 0 -g 250 -b 614400 -skip_threshold 0 -qmin 1 -qmax 51 -i ${INFILE} -vcodec libvpx -s ${W}x${H} -acodec libvorbis -ac 2 -y ${OUTDIR}/${BASE}.webm
ffmpeg -i ${INFILE} -c:v libvpx -qmin 10 -qmax 42 -c:a libvorbis -q:a 4 ${OUTDIR}/${BASE}.webm
rm -f ${OUTDIR}/${BASE}.jpg && ffmpeg -i ${INFILE} -s ${W}x${H} -vcodec mjpeg ${OUTDIR}/${BASE}.jpg
convert ${OUTDIR}/${BASE}.jpg ${OUTDIR}/${BASE}.png
