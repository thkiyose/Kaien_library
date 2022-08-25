namespace :mail do
  desc "mail/借りている本の返却期限が2日前の時ユーザーにメールを送信する。"

  task return_reminder: :environment do
    lendings = Lending.where(finished_at: nil)
    today = Date.today
    lendings.each do |lending|
      if (lending.expiry_date - today).to_i < 3
        LendingMailer.with(lending: lending).return_reminder_email.deliver_now
      end
    end
  end
end
