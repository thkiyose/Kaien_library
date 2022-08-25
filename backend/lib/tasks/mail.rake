namespace :mail do
  desc "mail/借りている本の返却期限が2日前の時と、予約している本がレンタル可能になった時ユーザーにメールを送信する。"

  today = Date.today

  task return_reminder: :environment do
    lendings = Lending.where(finished_at: nil)
    lendings.each do |lending|
      if (lending.expiry_date - today).to_i < 2
        LendingMailer.with(lending: lending).return_reminder_email.deliver_now
      end
    end
  end

  task can_lend_reminder: :environment do
    today = Date.today
    reservations = Reservation.where('expiry_date > ?', today)
    reservations.each do |reservation|
      if reservation.start_date == today && reservation.book.is_lent == false
        ReservationMailer.with(reservation: reservation).can_lend_reminder_email.deliver_now
      end
    end
  end
end
