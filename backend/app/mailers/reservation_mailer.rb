class ReservationMailer < ApplicationMailer
  default from: 'notifications@library.com'

  def can_lend_reminder_email
    @reservation = params[:reservation]
    @user = User.find(@reservation.user_id)
    mail(to: @user.email, subject: "予約していた書籍:#{@reservation.book.title} が借りられるようになりました。")
  end
end
