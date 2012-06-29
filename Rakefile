task :default => :hello

desc "oh well"
task :hello do
  puts "Hello world"
end

desc "print da doc"
task :print do
  require "yaml"
  require "google_drive"
  require "imdb"
  auth = YAML.load_file("config/google.yml")
  session = GoogleDrive.login(auth['user'], auth['pass'])

  for sheet in 0..3
    ws = session.spreadsheet_by_key("0AtFF6SiRVHtIdFVVbFF5eU40NFJwbTdnalppQ1hHZWc").worksheets[sheet]
    # Dumps all cells.
    for row in 1..ws.num_rows
      p "#{ws[row, 1]} #{ws[row, 2]}"
      search = Imdb::Search.new(ws[row,2]) unless ws[row,2].empty?
      p search.movies.first.id unless search.nil?
    end
  end
end

