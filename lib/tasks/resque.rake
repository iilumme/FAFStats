$LOAD_PATH.unshift File.dirname(__FILE__) + '/../lib'

require 'resque/tasks'
require 'resque/scheduler/tasks'

task "resque:setup" => :environment do
  Resque.enqueue(RatingsGetter)
end