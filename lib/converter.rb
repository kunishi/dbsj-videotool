require 'rubygems'
require 'csv'
require 'fileutils'
require 'streamio-ffmpeg'

class Converter
  attr_accessor :list, :h264_options, :webm_options
  attr_reader :movie

  def initialize
    FFMPEG::Transcoder.timeout = false
    @h264_options = {
      video_codec: "libx264",
      resolution: "854x480",
      video_min_bitrate: 300,
      video_max_bitrate: 300,
      buffer_size: 2000,
      preserve_aspect_ratio: :width,
      x264_vprofile: "baseline",
      x264_preset: "slow",
      audio_bitrate: 32,
      audio_sample_rate: 22050,
      audio_channels: 1,
      threads: 2,
      custom: "-crf 22 -pix_fmt yuv420p -movflags +faststart",
    }
    @webm_options = {
      video_codec: "libvpx",
      video_min_bitrate: 300,
      video_max_bitrate: 300,
      buffer_size: 2000,
      resolution: "854x480",
      preserve_aspect_ratio: :width,
      audio_codec: "libvorbis",
      audio_bitrate: 32,
      audio_sample_rate: 22050,
      audio_channels: 1,
      threads: 2,
      custom: "-crf 22 -deadline realtime -cpu-used -8",
    }
  end

  def read(file)
    @list = CSV.read(file)
  end

  def get_movie(path)
    @movie = FFMPEG::Movie.new(path)
  end

  def conv_jpg(movie, movie_data, dir)
    outdir = "#{dir}/#{movie_data[0]}/#{movie_data[1]}"
    FileUtils.mkdir_p outdir
    movie = get_movie(movie_data[2]) if movie.nil?
    movie.screenshot("#{outdir}/#{movie_data[1]}.jpg", {resolution: "1280x720"})
  end

  def conv_png(movie, movie_data, dir)
    outdir = "#{dir}/#{movie_data[0]}/#{movie_data[1]}"
    FileUtils.mkdir_p outdir
    movie = get_movie(movie_data[2]) if movie.nil?
    movie.screenshot("#{outdir}/#{movie_data[1]}.png", {resolution: "1280x720"})
  end

  def conv_h264(movie, movie_data, dir)
    outdir = "#{dir}/#{movie_data[0]}/#{movie_data[1]}"
    FileUtils.mkdir_p outdir
    movie = get_movie(movie_data[2]) if movie.nil?
    movie.transcode("#{outdir}/#{movie_data[1]}.mp4", @h264_options)
  end

  def conv_webm(movie, movie_data, dir)
    outdir = "#{dir}/#{movie_data[0]}/#{movie_data[1]}"
    FileUtils.mkdir_p outdir
    movie = get_movie(movie_data[2]) if movie.nil?
    movie.transcode("#{outdir}/#{movie_data[1]}.webm", @webm_options)
  end

  def do_convert movie_data, dir
    get_movie movie_data[2]
    conv_jpg @movie, movie_data, dir
    # conv_png @movie, movie_data, dir
    conv_h264 @movie, movie_data, dir
    conv_webm @movie, movie_data, dir
  end
end
