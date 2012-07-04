require './lib/ranteo/gdoc'
require "imdb"
require "json"
require 'r18n-core'

task :default => :hello

desc "oh well"
task :hello do
  puts "Hello world"
end

desc "print the worksheets found in the gdoc"
task :print do
  ws = Ranteo::Gdoc.sheets
  ws.each do |w|
    p w.title
  end
end

desc "fills the gdoc with imdb id and title for each film"
task :fill_imdb_info do
  sheets = Ranteo::Gdoc.sheets
  sheets.each do |ws|
    (2..ws.num_rows).each do |row|
      p "#{ws[row, 1]} #{ws[row, 2]}"
      next if ws[row,2].empty?
      begin
        search = Imdb::Search.new(ws[row,2])
        imdb_id = search.movies.first.id
        imdb_title = search.movies.first.title
        ws[row, 3] = imdb_id
        ws[row, 4] = imdb_title
        p "IMDB FOUND: #{imdb_id} #{imdb_title}"
      rescue
        p "NOT FOUND"
      end
    end
    ws.save
  end
end

desc "generates json database from each worksheet in gdoc"
task :generate_json do
  i18n = R18n::I18n.new "it"
  sheets = Ranteo::Gdoc.sheets
  sheets.each do |ws|
    sheet_data = ws.list.to_hash_array
    sheet_data.map do |item|
      unless item['date'].empty?
        date = Date.parse item['date']
        item['date'] = date.iso8601
        item['day'] = i18n.l(date, "%e %B")
      end
      item
    end
    filename = "public/json/#{ws.title}.js"
    File.open(filename, "w") do |file|
      file.write "#{ws.title}=#{sheet_data.to_json}"
    end
    puts "#{filename} saved"
  end
end
