# Makefile
#
# NWMatcher distribution builder
#
# currently just a wrapper for:
#
# - nwjslint.sh (writes to lint.log)
# - nwpackjs.sh (writes to dist.log)
#

# getting path
SOURCES=./

# resets default rules
.SUFFIXES:

# just in case they exists
.PHONY: all clean dist lint test

# add a SILENT flag to stop
# showing directories access
ifeq ($(filter -s,$(MAKEFLAGS)),)
MAKEFLAGS += -s
endif

# shell scripts
SCRIPTS=${SOURCES}/build/scripts

# default all stages
all:
	@make clean ${SOURCES}
	@make lint ${SOURCES}
	@make dist ${SOURCES}
	@make test ${SOURCES}

# clean stage
clean:
	@rm -f dist/nwmatcher.js
	@rm -f dist/nwmatcher-min.js
	@rm -f dist/nwmatcher-pac.js
	@rm -f dist/nwmatcher-src.js
	@rm -f dist/nwmatcher-zip.js
	@rm -f dist/lint.log

# dist stage
dist:
	@${SCRIPTS}/nwpackjs.sh ${SOURCES}

# lint stage
lint:
	@${SCRIPTS}/nwjslint.sh ${SOURCES}

# test stage
test:
	@${SCRIPTS}/nwtestjs.sh ${SOURCES}
