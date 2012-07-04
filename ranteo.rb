require 'sinatra'
require 'r18n-core'

i18n = R18n::I18n.new('it')

get '/' do
  now = DateTime.now
  @today = now.iso8601
  @oggi       = i18n.l(now, "%e %B")
  @domani     = i18n.l(now+1, "%e %B")
  @dopodomani = i18n.l(now+2, "%e %B")
  erb :index
end
