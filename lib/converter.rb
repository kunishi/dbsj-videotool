require 'csv'

class Converter
  attr_accessor :list
  
  def read(file)
    @list = CSV.read(file)
  end
end
