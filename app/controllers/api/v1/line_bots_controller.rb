# frozen_string_literal: true

class Api::V1::LineBotsController < SecuredController
  def link
    nonce = SecureRandom.uuid
    current_user.line_nonce = nonce
    current_user.save!

    link_token = params[:linkToken]
    render json: { redirectUrl: "https://access.line.me/dialog/bot/accountLink?linkToken=#{link_token}&nonce=#{nonce}" }, status: :ok
  end
end
