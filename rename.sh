#!/bin/sh

FROM=$1
TO=$2
#ECHO=echo
ECHO=

${ECHO} mv -f ${FROM} ${TO}
${ECHO} mv -f ${TO}/${FROM}.jpg ${TO}/${TO}.jpg
${ECHO} mv -f ${TO}/${FROM}.mp4 ${TO}/${TO}.mp4
${ECHO} mv -f ${TO}/${FROM}.png ${TO}/${TO}.png
${ECHO} mv -f ${TO}/${FROM}.webm ${TO}/${TO}.webm
