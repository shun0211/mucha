# frozen_string_literal: true

require "yaml"

require "active_support/duration"
require "active_support/values/time_zone"
require "active_support/core_ext/object/acts_like"
require "active_support/core_ext/date_and_time/compatibility"

module ActiveSupport
  class TimeWithZone
    def next_monday
      case week
      when "monday"
        self + 7.days
      when "tuesday"
        self + 6.day
      when "wednesday"
        self + 5.days
      when "thursday"
        self + 4.days
      when "friday"
        self + 3.days
      when "saturday"
        self + 2.days
      when "sunday"
        self + 1.day
      end
    end

    def next_tuesday
      case week
      when "monday"
        self + 1.day
      when "tuesday"
        self + 7.day
      when "wednesday"
        self + 6.days
      when "thursday"
        self + 5.days
      when "friday"
        self + 4.days
      when "saturday"
        self + 3.days
      when "sunday"
        self + 2.days
      end
    end

    def next_wednesday
      case week
      when "monday"
        self + 2.days
      when "tuesday"
        self + 1.day
      when "wednesday"
        self + 7.days
      when "thursday"
        self + 6.days
      when "friday"
        self + 5.days
      when "saturday"
        self + 4.days
      when "sunday"
        self + 3.days
      end
    end

    def next_thursday
      case week
      when "monday"
        self + 3.days
      when "tuesday"
        self + 2.days
      when "wednesday"
        self + 1.day
      when "thursday"
        self + 7.days
      when "friday"
        self + 6.days
      when "saturday"
        self + 5.days
      when "sunday"
        self + 4.days
      end
    end

    def next_friday
      case week
      when "monday"
        self + 4.days
      when "tuesday"
        self + 3.days
      when "wednesday"
        self + 2.days
      when "thursday"
        self + 1.day
      when "friday"
        self + 7.days
      when "saturday"
        self + 6.days
      when "sunday"
        self + 5.days
      end
    end

    def next_saturday
      case week
      when "monday"
        self + 5.days
      when "tuesday"
        self + 4.days
      when "wednesday"
        self + 3.days
      when "thursday"
        self + 2.days
      when "friday"
        self + 1.day
      when "saturday"
        self + 7.days
      when "sunday"
        self + 6.days
      end
    end

    def next_sunday
      case week
      when "monday"
        self + 6.days
      when "tuesday"
        self + 5.day
      when "wednesday"
        self + 4.days
      when "thursday"
        self + 3.days
      when "friday"
        self + 2.days
      when "saturday"
        self + 1.days
      when "sunday"
        self + 7.days
      end
    end

    def week
      case wday
      when 0
        "sunday"
      when 1
        "monday"
      when 2
        "tuesday"
      when 3
        "wednesday"
      when 4
        "thursday"
      when 5
        "friday"
      when 6
        "saturday"
      end
    end
  end
end
