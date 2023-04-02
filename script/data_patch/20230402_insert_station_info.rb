# USAGE:
# bundle exec rails runner 'load "script/data_patch/20230402_insert_station_info.rb"; DataPatch::InsertStationInfo.new.execute!'

module DataPatch
  class InsertStationInfo
    def initialize
      @logger = Logger.new("#{Rails.root}/log/insert_station_info.log")
    end

    def execute!
      puts '【処理開始】'
      @logger.info('Start')

      1.upto Float::INFINITY do |i|
        puts "【#{i}回目】"
        offset = (100 * (i - 1)) + 1
        res = ekispert_conn.get('/v1/json/station', {offset: offset, limit: 100})
        stations = JSON.parse(res.body)['ResultSet']['Point']
        break if stations.blank?

        inserted_station = stations.map do |station|
          {
            name: station['Station']['Name'],
            name_kana: station['Station']['Yomi'],
            code: station['Station']['code'],
            prefecture: station['Prefecture']['Name'],
            prefecture_code: station['Prefecture']['code'],
            lat: station['GeoPoint']['lati_d'],
            lng: station['GeoPoint']['longi_d']
          }
        end
        Station.insert_all(inserted_station)
        sleep 5
      end

      puts '【実行終了】'
      @logger.info('End')
      puts 'Station Count: ' + Station.count.to_s
    end

    private def ekispert_conn
      Faraday.new(
        url: ENV['EKISPERT_API_URL'],
        headers: {'Accept' => 'application/json'},
        params: {
          key: 'LE_bceGdCxgmxxCS',
          gcs: 'tokyo'
        }
      )
    end
  end
end
