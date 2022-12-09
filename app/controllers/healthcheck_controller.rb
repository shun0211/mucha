class HealthcheckController < ApplicationController
  def healthcheck
    render plain: 'ok', status: :ok
  end
end
