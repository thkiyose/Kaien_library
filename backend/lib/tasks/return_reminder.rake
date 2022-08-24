namespace :return_reminder do
  desc "mailer/借りている本の返却期限の1日前にユーザーにメールを送信する。"
  task :return_reminder => :development do
  lendings = Lending.where(finished_at: nil)
  today = Date.today
  lendings.each do |lending|
    if today - lending.expiry_date < 1
      puts "返却期限が近づいています:#{lending.expiry_date}"
    end
  end
end
