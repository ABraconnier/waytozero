class WeeklyChallengesController < ApplicationController
  def index
  end

  def create
  end

  def update
    @challenge = Challenge.find(params[@challenge.id])
    @user = current_user
    @challenge.size == true ? xp = 50 : xp = 25
    @user.xp += xp
    @user.level += 1 while level_up?
    @user.save
  end

  private

  def level_up?
    if @user.level.zero?
      @user.xp -= 25
      true
    elsif @user.level <= 9 && @user.xp >= 50
      @user.xp -= 50
      true
    elsif @user.level > 9 && @user.xp >= @user.level * 10
      @user.xp -= @user.level * 10
      true
    else
      false
    end
  end
end
