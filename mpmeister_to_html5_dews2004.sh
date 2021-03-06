#!/bin/sh

MPBASE=/Volumes/Drobo/kunishi/dbsj
MPDIR=${MPBASE}/www/html/$1
MP_MOVIE_DIR=${MPBASE}/Content/$1

OUTBASE=${MPBASE}/work/videos
OUTDIR=${OUTBASE}/$2

MKDIR='mkdir -p'
CP='cp -p'
CONVERT='convert -geometry 200x150'
SHELL=/bin/sh
RM='rm -f'

for d in ${MPDIR}/*; do
    echo "mkdir ${dir}"
    dir=`basename ${d}`
    ${MKDIR} ${OUTDIR}/${dir}
    ${MKDIR} ${OUTDIR}/${dir}/slides
    ${MKDIR} ${OUTDIR}/${dir}/thumbnails
    echo "copy and convert slides in ${dir}"
    for img in ${MPDIR}/${dir}/slide/image/*.png; do
        ${CP} ${img} ${OUTDIR}/${dir}/slides
        ${CONVERT} ${img} ${OUTDIR}/${dir}/thumbnails/`basename ${img}`
    done
    if [ -f ${MP_MOVIE_DIR}/${dir}/mpout.wmv ]; then
        echo "convert wmv file in ${dir}"
        video=${MP_MOVIE_DIR}/${dir}/mpout.wmv
        ${SHELL} converter.sh ${video} ${dir} ${OUTDIR}/${dir}
    fi
    if [ -f ${MP_MOVIE_DIR}/${dir}/mpout.rm ]; then
        echo "convert rm file in ${dir}"
        video=${MP_MOVIE_DIR}/${dir}/mpoout.rm
        ${SHELL} converter.sh ${video} ${dir} ${OUTDIR}/${dir}
    fi
    ${RM} ${MP_MOVIE_DIR}/${dir}/AudioVisual/*.log
done
