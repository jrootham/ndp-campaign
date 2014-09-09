
# do the setup things

.SUFFIXES:
SHELL = /bin/sh
SYSTEM = jrootham@tjddev.net
BASE = docroot/testcampaign/

# the ship target ships all the files

#  need separate rule for each directory thus this function

define SHIP
ship/$(1)/%: $(1)/%
	ssh $(SYSTEM) 'mkdir -p $(BASE)$(1)'
	scp $(1)/$$* $(SYSTEM):$(BASE)$(1)/$$*
	touch ship/$(1)/$$*
endef

SHIPDIRS=admin/address admin/person admin/recruit canvasser common css js node \
	scripts/canvasser scripts/admin/address scripts/admin/person scripts/admin/recruit test

$(foreach shipdir,$(SHIPDIRS),$(eval $(call SHIP,$(shipdir))))

proxies/%: %
	touch proxies/$*

canvasserDest/%.js: canvasserSrc/%.js
	jsx canvasserSrc canvasserDest

adminDest/address/%.js: adminSrc/address/%.js
	jsx adminSrc/address adminDest/address

adminDest/person/%.js: adminSrc/person/%.js
	jsx adminSrc/person adminDest/person

adminDest/recruit/%.js: adminSrc/recruit/%.js
	jsx adminSrc/recruit adminDest/recruit

# define the highest level objects

CANVASSER = proxies/canvasser/index.html proxies/canvasser/canvasser.html \
	proxies/canvasser/load.html proxies/canvasser/signup.html

ADMIN = proxies/admin/index.html \
	proxies/admin/address/index.html proxies/admin/address/new.html proxies/admin/address/edit.html \
	proxies/admin/person/index.html proxies/admin/person/new.html proxies/admin/person/edit.html

#	proxies/admin/recruit/index.html proxies/admin/recruit/recruit.html proxies/admin/recruit/assign.html

NODE = proxies/node/main.js

proxies: $(CANVASSER) $(ADMIN) $(NODE) proxies/index.html

proxies/index.html: ship/index.html

# canvasser pages

proxies/canvasser/index.html: \
	ship/canvasser/index.html ship/css/canvasser.css

proxies/canvasser/canvasser.html: \
	ship/canvasser/canvasser.html ship/css/canvasser.css ship/scripts/canvasserApp.js

proxies/canvasser/load.html: \
	ship/canvasser/load.html ship/css/canvasser.css ship/scripts/loadApp.js

proxies/canvasser/signup.html: \
	ship/canvasser/signup.html ship/css/canvasser.css ship/scripts/signupApp.js

# admin pages

proxies/admin/index.html: \
	ship/admin/index.html ship/css/admin.css

proxies/admin/address/index.html: \
	ship/admin/address/index.html ship/css/admin.css

proxies/admin/address/new.html: \
	ship/admin/address/new.html ship/css/admin.css ship/scripts/admin/address/newApp.js

proxies/admin/address/edit.html: \
	ship/admin/address/edit.html ship/css/admin.css ship/scripts/admin/address/editApp.js

proxies/admin/person/index.html: \
	ship/admin/address/index.html ship/css/admin.css

proxies/admin/person/new.html: \
	ship/admin/address/new.html ship/css/admin.css ship/scripts/admin/address/newApp.js

proxies/admin/person/edit.html: \
	ship/admin/address/edit.html ship/css/admin.css ship/scripts/admin/address/editApp.js

#proxies/admin/recruit.html: \
#	ship/admin/recruit.html ship/css/admin.css ship/scripts/recruitApp.js

#proxies/admin/enter.html: \
#	ship/admin/enter.html ship/css/admin.css ship/scripts/enterApp.js

#proxies/admin/assign.html: \
#	ship/admin/assign.html ship/css/admin.css ship/scripts/assignApp.js

# node server

proxies/node/main.js: \
	ship/node/main.js  ship/node/recruit.js ship/node/admin.js \
	ship/node/server.js ship/common/defs.js ship/node/routeTable.js ship/common/recruitFns.js \
	ship/common/find.js \
	ship/test/dataAccess.js ship/test/credentialOne.js ship/test/credentialZero.js ship/test/permissions.js

# create superusers

proxies/node/bootstrapMain.js: \
	ship/node/bootstrapMain.js

ship/index.html: index.html
	scp index.html $(SYSTEM):$(BASE)index.html
	touch ship/index.html

ship/admin/index.html: admin/index.html
	scp admin/index.html $(SYSTEM):$(BASE)admin/index.html
	touch ship/admin/index.html

# browserify dependencies
# canvasser

scripts/canvasser/canvasserApp.js: canvasser/canvasser.js canvasserDest/canvasserJSX.js \
	    js/fetchData.js js/keyFunctions.js js/serialize.js common/find.js js/message.js
	browserify canvasser/canvasser.js > scripts/canvasser/canvasserApp.js

scripts/canvasser/loadApp.js: canvasser/load.js canvasserDest/loadJSX.js js/message.js
	browserify canvasser/load.js > scripts/canvasser/loadApp.js

scripts/canvasser/signupApp.js: canvasser/signup.js  canvasserDest/recruit/signupJSX.js js/message.js \
		js/message.js
	browserify canvasser/signup.js > scripts/canvasser/signupApp.js

# admin address

scripts/admin/address/newApp.js: admin/address/new.js adminDest/address/newJSX.js  \
		adminDest/address/commonJSX.js \
		js/message.js \
        js/common.js
	browserify admin/address/new.js > scripts/admin/address/newApp.js

scripts/admin/address/editApp.js: admin/address/new.js adminDest/address/editJSX.js  \
		js/message.js \
        js/common.js
	browserify admin/address/edit.js > scripts/admin/address/editApp.js



# admin person

# admin recruit


#scripts/recruitApp.js: admin/recruit.js adminDest/recruitJSX.js adminDest/selectRecruitJSX.js \
#		adminDest/recruitCommonJSX.js js/message.js \
#        js/common.js
#	browserify admin/recruit.js > scripts/recruitApp.js
#
#scripts/enterApp.js: admin/enter.js adminDest/enterJSX.js  adminDest/recruitCommonJSX.js js/message.js \
#       	js/common.js
#	browserify admin/enter.js > scripts/enterApp.js
#
#scripts/assignApp.js: admin/assign.js adminDest/assignJSX.js adminDest/permissionsJSX.js \
#		adminDest/selectRecruitJSX.js js/message.js
#	browserify admin/assign.js > scripts/assignApp.js


# clean up the tree

clean:
	rm -rf adminDest/address/*
	rm -rf adminDest/address/.??*
	rm -rf adminDest/person/*
	rm -rf adminDest/person/.??*
	rm -rf adminDest/recruit/*
	rm -rf adminDest/recruit/.??*
	rm -rf canvasserDest/*
	rm -rf canvasserDest/.??*
	rm -f scripts/canvasser/*
	rm -f scripts/admin/address/*
	rm -f scripts/admin/person/*
	rm -f scripts/admin/recruit/*
	rm -f ship/admin/address/*
	rm -f ship/admin/person/*
	rm -f ship/admin/recruit/*
	rm -f ship/canvasser/*
	rm -f ship/css/*
	rm -f ship/js/*
	rm -f ship/node/*
	rm -f ship/scripts/canvasser/*
	rm -f ship/scripts/admin/address/*
	rm -f ship/scripts/admin/person/*
	rm -f ship/scripts/admin/recruit/*
	rm -f proxies/admin/index.html
	rm -f proxies/admin/address/*
	rm -f proxies/admin/person/*
	rm -f proxies/admin/recruit/*
	rm -f proxies/canvasser/*
	rm -f proxies/node/*
