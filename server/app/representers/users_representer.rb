class UsersRepresenter
  def initialize(users)
    @users = users
  end
  
  def as_json
    users.map do |user|
      UserRepresenter.new(user).as_json
    end
  end

  private

  attr_reader :users
end
