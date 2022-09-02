class LendingMailer < ApplicationMailer
  default from: 'notifications@library.com'

  def return_reminder_email
    @lending = params[:lending]
    @user = User.find(@lending.user_id)
    mail(to: @user.email, subject: "#{@lending.book.title} の返却期限が近づいています。")
  end
end
