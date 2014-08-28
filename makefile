
# do the setup things

.SUFFIXES:
SHELL = /bin/sh
SYSTEM = jrootham@tjddev.net
BASE = docroot/testcampaign/

# the ship target ships all the files

#  need separate rule for each directory thus this function

define SHIP
ship/$(1)/%: $(1)/%
	scp $(1)/$$* $(SYSTEM):$(BASE)$(1)/$$*
	touch ship/$(1)/$$*
endef

SHIPDIRS=admin canvasser common css js node scripts test

$(foreach shipdir,$(SHIPDIRS),$(eval $(call SHIP,$(shipdir))))

proxies/%: %
	touch proxies/$*

canvasserDest/%.js: canvasserSrc/%.js
	jsx canvasserSrc canvasserDest

adminDest/%.js: adminSrc/%.js
	jsx adminSrc adminDest

# define the highest level objects

CANVASSER = proxies/canvasser/index.html proxies/canvasser/canvasser.html \
	proxies/canvasser/load.html proxies/canvasser/signup.html

ADMIN = proxies/admin/index.html proxies/admin/enter.html proxies/admin/recruit.html proxies/admin/assign.html

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

proxies/admin/recruit.html: \
	ship/admin/recruit.html ship/css/admin.css ship/scripts/recruitApp.js

proxies/admin/enter.html: \
	ship/admin/enter.html ship/css/admin.css ship/scripts/enterApp.js

proxies/admin/assign.html: \
	ship/admin/assign.html ship/css/admin.css ship/scripts/assignApp.js

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

# browserify dependencies

scripts/canvasserApp.js: canvasser/canvasser.js canvasserDest/canvasserJSX.js \
	    js/fetchData.js js/keyFunctions.js js/serialize.js common/find.js js/message.js
	browserify canvasser/canvasser.js > scripts/canvasserApp.js

scripts/loadApp.js: canvasser/load.js canvasserDest/loadJSX.js
	browserify canvasser/load.js > scripts/loadApp.js js/message.js

scripts/signupApp.js: canvasser/signup.js  canvasserDest/signupJSX.js js/message.js
	browserify canvasser/signup.js > scripts/signupApp.js js/message.js

scripts/recruitApp.js: admin/recruit.js adminDest/recruitJSX.js adminDest/recruitCommonJSX.js js/message.js \
        js/common.js
	browserify admin/recruit.js > scripts/recruitApp.js

scripts/enterApp.js: admin/enter.js adminDest/enterJSX.js  adminDest/recruitCommonJSX.js js/message.js \
       	js/common.js
	browserify admin/enter.js > scripts/enterApp.js

scripts/assignApp.js: admin/assign.js adminDest/assignJSX.js js/message.js
	browserify admin/assign.js > scripts/assignApp.js


# clean up the tree

clean:
	rm -rf adminDest/*
	rm -rf canvasserDest/*
	rm -rf adminDest/.??*
	rm -rf canvasserDest/.??*
	rm -f scripts/*
	rm -f ship/admin/*
	rm -f ship/canvasser/*
	rm -f ship/css/*
	rm -f ship/js/*
	rm -f ship/node/*
	rm -f ship/scripts/*
	rm -f proxies/admin/*
	rm -f proxies/canvasser/*
	rm -f proxies/node/*
