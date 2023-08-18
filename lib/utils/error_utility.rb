class ErrorUtility
  def self.logger(error)
    Rollbar.error(error)
    Rails.logger.error error.class
    Rails.logger.error error.message
    Rails.logger.error error.backtrace&.join("\n")
  end
end
