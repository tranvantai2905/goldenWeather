class UserRepresenter
  def initialize(user)
    @user = user
  end
  
  def as_json
    {
      id: user.id,
      username: user.username,
      email: user.email,
      city: user.city
    }
  end

  private
  attr_reader :user
end

