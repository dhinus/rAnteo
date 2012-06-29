require 'sinatra'

def mese(month)
  case month.to_i
  when 1
    "Gennaio"
  when 2
    "Febbraio"
  when 3
    "Marzo"
  when 4
    "Aprile"
  when 5
    "Maggio"
  when 6
    "Giugno"
  when 7
    "Luglio"
  when 8
    "Agosto"
  when 9
    "Settembre"
  when 10
    "Ottobre"
  when 11
    "Novembre"
  when 12
    "Dicembre"
  else
    month
  end
end

get '/' do
  now = DateTime.now
  @today = now.iso8601
  @oggi       = now.strftime("%e")+' '+mese(now.strftime("%m"))
  @domani     = (now+1).strftime("%e")+' '+mese((now+1).strftime("%m"))
  @dopodomani = (now+2).strftime("%e")+' '+mese((now+1).strftime("%m"))
  erb :index
end
