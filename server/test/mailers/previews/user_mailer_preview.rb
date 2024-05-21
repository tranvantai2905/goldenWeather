# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def confirmation_email
    user = User.new(email: "taiho58@gmail.com", username: "tai29052002", password:"password", city: "HaNoi", confirmation_token: "aea6ab051fd66efabf4e")
    UserMailer.confirmation_email(user)
  end
end
