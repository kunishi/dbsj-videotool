require 'csv'

class Converter
  def read(file)
    @list = CSV.read(file)
  end
end
