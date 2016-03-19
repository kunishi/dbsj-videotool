require 'rake/testtask'
require 'net/http'

desc 'Get sample movie from sample-movie.com'
task :fetch do
  if !File.exist? "sample/big_buck_bunny_720p_1mb.mp4"
    Net::HTTP.start "www.sample-videos.com" do |http|
      resp = http.get "/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
      open("sample/big_buck_bunny_720p_1mb.mp4", "w") do |file|
        file.write(resp.body)
      end
    end
  end
end

desc 'Run test_unit based test'
Rake::TestTask.new do |t|
  # To run test for only one file (or file path pattern)
  #  $ bundle exec rake test TEST=test/test_specified_path.rb
  t.libs << "test"
  t.test_files = Dir["test/**/test_*.rb"]
  t.verbose = true
end
