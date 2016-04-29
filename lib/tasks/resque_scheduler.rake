# require 'resque/tasks'
# require 'resque/scheduler/tasks'
#
# namespace :resque do
#   task :setup do
#     require 'resque'
#     require 'resque/scheduler'
#
#     ENV['REDISTOGO_URL'] ||= 'redis://redistogo:12dd70e8254322297d4c7f8d72a86bf9@lab.redistogo.com:9597/'
#     uri = URI.parse(ENV['REDISTOGO_URL'])
#
#     Resque.redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
#     Resque.schedule = YAML.load_file("#{Rails.root}/config/resque_schedule.yml")
#
#   end
# end