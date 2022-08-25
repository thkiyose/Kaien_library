require File.expand_path(File.dirname(__FILE__) + '/environment')
require 'active_support/core_ext/time'

def jst(time)
  Time.zone = 'Asia/Tokyo'
  Time.zone.parse(time).localtime($system_utc_offset)
end

job_type :rake, "source /Users/harukatezuka/.zshrc; export PATH=\"$HOME/.rbenv/bin:$PATH\"; eval \"$(rbenv init -)\"; cd :path && RAILS_ENV=:environment bundle exec rake :task :output"

rails_env = ENV['RAILS_ENV'] || :development

set :environment, rails_env

set :output, "#{Rails.root}/log/cron.log"

every :hour do
  rake 'mail:return_reminder'
end

every 1.day, at: jst('12:00 pm') do
  rake 'mail:return_reminder'
end
