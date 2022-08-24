namespace :mail do
  desc "mail/借りている本の返却期限の1日前にユーザーにメールを送信する。"

  task return_reminder: :environment do
    lendings = Lending.where(finished_at: nil)
    today = Date.today
    lendings.each do |lending|
      if (lending.expiry_date - today).to_i < 2
        puts "返却期限が近づいています:#{lending.book.title}:#{lending.expiry_date}"
      end
    end
  end
end
