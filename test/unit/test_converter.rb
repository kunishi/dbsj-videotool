require 'test/unit'
require 'converter'
require 'csv'
require 'fileutils'

class TestConverter < Test::Unit::TestCase
  def setup
    @converter = Converter.new
    @data = CSV.read("sample/sample.csv")
    FileUtils.rm_rf "/tmp/#{@data[0][0]}" if File.exist? "/tmp/#{@data[0][0]}"
  end

  def load_sample_csv
    @converter.read "sample/sample.csv"
  end

  def test_instance
    assert_equal(@converter.class, Converter)
  end

  def test_read
    assert_equal(@data[0][0], "DEIM2014")
  end

  def test_accessor
    load_sample_csv
    assert_equal(@converter.list[0][0], "DEIM2014")
  end

  def test_h264_options
    options = @converter.h264_options
    assert_equal(options[:video_codec], "libx264")
  end

  def test_webm_options
    options = @converter.webm_options
    assert_equal options[:video_codec], "libvpx"
    assert_equal options[:audio_codec], "libvorbis"
  end

  def test_get_movie
    data = load_sample_csv
    movie = @converter.get_movie(data[0][2])
    assert_equal(movie.class, FFMPEG::Movie)
  end

  def test_conv_jpg
    data = load_sample_csv
    movie = @converter.get_movie(data[0][2])
    @converter.conv_jpg(movie, data[0], "/tmp")
    assert_true(File.exist?("/tmp/#{data[0][0]}/#{data[0][1]}/#{data[0][1]}.jpg"))
  end

  def test_conv_png
    data = load_sample_csv
    movie = @converter.get_movie(data[0][2])
    @converter.conv_png(movie, data[0], "/tmp")
    assert_true(File.exist?("/tmp/#{data[0][0]}/#{data[0][1]}/#{data[0][1]}.png"))
  end

  def test_conv_h264
    data = load_sample_csv
    movie = @converter.get_movie(data[0][2])
    @converter.conv_h264(movie, data[0], "/tmp")
    assert_true(File.exist?("/tmp/#{data[0][0]}/#{data[0][1]}/#{data[0][1]}.mp4"))
  end

  def test_conv_webm
    data = load_sample_csv
    movie = @converter.get_movie data[0][2]
    @converter.conv_webm(movie, data[0], "/tmp")
    assert_true(File.exist?("/tmp/#{data[0][0]}/#{data[0][1]}/#{data[0][1]}.webm"))
  end

  def test_do_convert
    data = load_sample_csv
    @converter.do_convert data[0], "/tmp"
    outdir = "/tmp/#{data[0][0]}/#{data[0][1]}"
    assert_true File.directory? outdir
    assert_true File.exist? "#{outdir}/#{data[0][1]}.jpg"
    assert_true File.exist? "#{outdir}/#{data[0][1]}.png"
    assert_true File.exist? "#{outdir}/#{data[0][1]}.mp4"
    assert_true File.exist? "#{outdir}/#{data[0][1]}.webm"
  end
end
