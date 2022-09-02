namespace :mail do
  desc "mail/借りている本の返却期限が1日前の時ユーザーにメールを送信する。"

  today = Date.today

  task return_reminder: :environment do
    lendings = Lending.where(finished_at: nil)
    lendings.each do |lending|
      if (lending.expiry_date - today).to_i == 1
        LendingMailer.with(lending: lending).return_reminder_email.deliver_now
      end
    end
  end
end
