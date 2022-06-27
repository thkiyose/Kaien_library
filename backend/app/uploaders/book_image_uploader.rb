class BookImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  process resize_to_fit: [128, 181]

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
