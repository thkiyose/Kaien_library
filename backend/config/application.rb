require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"
require "csv"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 6.1
    config.api_only = true
    config.autoload_paths += Dir[Rails.root.join('app', 'uploaders')]
    config.i18n.default_locale = :ja
    config.i18n.load_path += Dir[Rails.root.join('config/locales/**/*.yml').to_s]
    config.active_model.i18n_customize_full_message = true
  end
end
