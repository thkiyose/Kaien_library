class BookImageUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  storage :file

  def store_dir
       "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
     end

     def default_url
       'noimage.jpg'
     end

     def extension_allowlist
       %w(jpg jpeg gif png)
     end
end
