class BookImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  process resize_to_fit: [128, 181]

  storage :file

  configure do |config|
    config.asset_host = "http://localhost:3000"
  end

  def store_dir
       "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
     end

     def extension_allowlist
       %w(jpg jpeg gif png)
     end
end
