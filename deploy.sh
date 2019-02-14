#!/usr/bin/env bash

npm run build:prod
scp -r dist root@118.89.108.25:/root/vue-admin/

#
#case $1 in
#        server|s)
#            cd web_server
#            sh autobuild.sh
#        ;;
#        client|c)
#            cd web_client
#            npm run build:prod
#            scp -r dist root@118.89.108.25:/root/vue-admin/
#        ;;
#        all|a)
#            cd web_client
#            npm run build:prod
#            scp -r dist root@118.89.108.25:/root/vue-admin/
#            cd ..
#            cd web_server
#            sh autobuild.sh
#        ;;
#        *)
#            echo "$0 {server|client|all}"
#            exit 4
#        ;;
#esac


