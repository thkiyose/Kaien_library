DeviseTokenAuth.setup do |config|
  config.token_cost = Rails.env.test? ? 4 : 10
  config.token_lifespan = 2.weeks
  config.headers_names = {:'access-token' => 'access-token',
                         :'client' => 'client',
                         :'expiry' => 'expiry',
                         :'uid' => 'uid',
                         :'token-type' => 'token-type' }
  config.change_headers_on_each_request = false
end
