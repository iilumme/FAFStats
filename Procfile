web: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
redis: redis-server
worker: env TERM_CHILD=1 QUEUES=* bundle exec rake resque:work
scheduler: bundle exec rake resque:scheduler