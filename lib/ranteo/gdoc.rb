require "yaml"
require "google_drive"

module Ranteo

  class Gdoc

    def self.auth
      @auth ||= YAML.load_file("config/google.yml")
    end

    def self.session
      @session ||= GoogleDrive.login(auth['user'], auth['pass'])
    end

    def self.sheets
      @sheets ||= session.spreadsheet_by_key("0AtFF6SiRVHtIdFVVbFF5eU40NFJwbTdnalppQ1hHZWc").worksheets
    end

  end

end
