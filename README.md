# dbsj-videotool
scripts for DBSJ video maintenance

## Prerequisits
these scripts need the following external tools:

- ffmpeg (with libx264 vcodec, libvpx vcodec, and libvorbis audio codec)

Also, they are implemented as UNIX shell scripts.  Cygwin is needed if you run these on Windows platform (though not tested).

## usage

### converter.sh

A script for converting video into H.264 and WebM (VP8 + Vorbis).  Also, it makes screenshots of the video in JPEG and PNG format.

```
converter.sh [-m] [-w] [-i] INFILE BASE OUTDIR

-m : Encode in H.264 format
-w : Encode in WebM format
-i : Make screenshots
```

If you specify none of the {-m, -w, -i} options, the script encodes the video in ALL format (H.264, WebM, JPEG, and PNG).
