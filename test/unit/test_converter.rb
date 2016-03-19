require 'test/unit'
require 'converter'

class TestConverter < Test::Unit::TestCase
  def setup
    @converter = Converter.new
  end

  def test_instance
    assert_equal(@converter.class, Converter)
  end

  def test_read
    data = @converter.read("sample/sample.csv")
    assert_equal(data[0][0], "DEIM2014")
  end

  def test_accessor
    @converter.read("sample/sample.csv")
    assert_equal(@converter.list[0][0], "DEIM2014")
  end
end
