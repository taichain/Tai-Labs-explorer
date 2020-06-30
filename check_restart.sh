#!/bin/bash
step=4
for ((i=0;i<148;i=(i+step)));do
  count=`ps aux | grep "app.js" | grep -v "grep" | wc -l`
  if [ $count -lt 1 ]; then
    mv /var/www/TAIBrowser/logs/out.log.txt /var/www/TAIBrowser/logs/c_out.$(date -d "today" +"%Y%m%d_%H%M%S").txt
    mv /var/www/TAIBrowser/logs/err.log.txt /var/www/TAIBrowser/logs/c_err.$(date -d "today" +"%Y%m%d_%H%M%S").txt
    nohup node /var/www/TAIBrowser/app.js 1>/var/www/TAIBrowser/logs/out.log.txt 2>/var/www/TAIBrowser/logs/err.log.txt &
    echo "start app ..."
  fi
  count_g=`ps aux | grep "grabber.js" | grep -v "grep" | wc -l`
  if [ $count_g -lt 1 ]; then
    mv /var/www/TAIBrowser/tools/logs/out.log.txt /var/www/TAIBrowser/tools/logs/c_out.$(date -d "today" +"%Y%m%d_%H%M%S").txt
    mv /var/www/TAIBrowser/tools/logs/err.log.txt /var/www/TAIBrowser/tools/logs/c_err.$(date -d "today" +"%Y%m%d_%H%M%S").txt
    nohup node /var/www/TAIBrowser/tools/grabber.js 1>/var/www/TAIBrowser/tools/logs/out.log.txt 2>/var/www/TAIBrowser/tools/logs/err.log.txt &
    echo "start grabber ..."
  fi
  sleep $step
done
exit 0
