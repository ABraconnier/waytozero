class WeeklyChallengesController < ApplicationController

  def create
    @weekly_challenge = WeeklyChallenge.new
    challenge = Challenge.find(params[:format])
    @weekly_challenge.challenge = challenge
    # @weekly_challenge.week = ?
    # @weekly_challenge.year = ?
    if params[:done] == "true"
      @weekly_challenge.status_challenge = true
      @user = current_user
      @weekly_challenge.save
      @weekly_challenge.challenge.size == true ? xp = 50 : xp = 25
      @user.xp += xp
      @user.level += 1 while level_up?
      @user.save
      # check with Antoine br to make sure it is ok
    end

    @weekly_challenge.user = current_user
    @weekly_challenge.save
    achievement_number?
    redirect_to dashboard_path
  end

  def update
    @challenge = WeeklyChallenge.find(params[:id])
    @user = current_user
    @challenge.status_challenge = true
    @challenge.save
    @challenge.challenge.size == true ? xp = 50 : xp = 25
    @user.xp += xp
    @user.level += 1 while level_up?
    @user.save
    achievement_number?
    # redirect_to dashboard_path
  end

  private

  def weekly_challenges_params
    params.require(:weekly_challenge).permit(:status_challenge, :week, :year)
  end

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

  def achievement_number?
    size = WeeklyChallenge.where(user: @user, status_challenge: true).size
    case size
    when 5, 10, 20, 30
      new_succesnumber(size)
    end
  end

  def achievement_category?
  end

  def new_succesnumber(number)
    Success.create!(user: @user, achievement: AchievementNumber.find_by(number: number))
  end
end
