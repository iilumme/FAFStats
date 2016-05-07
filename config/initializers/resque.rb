require 'resque/scheduler'

ENV['REDISTOGO_URL'] ||= 'redis://redistogo:12dd70e8254322297d4c7f8d72a86bf9@lab.redistogo.com:9597/'
uri = URI.parse(ENV['REDISTOGO_URL'])

Resque.redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

Dir["#{Rails.root}/app/jobs/*.rb"].each { |file| require file }

Resque.schedule = YAML.load_file("#{Rails.root}/config/resque_schedule.yml")

Resque.after_fork = Proc.new { ActiveRecord::Base.establish_connection }