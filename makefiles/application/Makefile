#
# Actions:
#
#    start              Start the application
#    restart            Restart the application
#    startOrRestart     Start or restart the application
#    stop               Stop the application
#
#    process.show       Show the application process
#    logs.show          Show application logs
#

########################################################
###                     Variables                    ###
########################################################

# The project name
PROJECT_NAME ?= $(shell jq -r '.name' package.json)

ifndef NODE
    # Node binary directory
    NODE_BIN_DIR := /usr/bin /usr/local/bin

    # Node bin
    NODE := $(shell find $(NODE_BIN_DIR) -name node \( -type f -or -type l \))
endif

# The process manager
PROCESS_MANAGER ?= pm2

# The configs directory
CONFIGS_DIR ?= configs

########################################################
###                      Export                      ###
########################################################

# The node config directory
export NODE_CONFIG_DIR ?= $(CURDIR)/$(CONFIGS_DIR)/node

# The current environment
export NODE_ENV ?= development

########################################################
###                     Functions                    ###
########################################################

#
# Print the title of action
#
# $(1) {String} Title
#
ifndef printActionTitle
define printActionTitle
    $(info )
    $(info =====> $(1))
endef
endif

#
# Print info until start application
#
define printInfoBeforeStart
    $(info User:            $(shell whoami))
    $(info Environment:     $(NODE_ENV))
    $(info Nodejs version:  $(shell $(NODE) --version))
    $(info ---------------------------------)
endef

########################################################
###            Application actions rules             ###
########################################################

# Start the application
.PHONY: start
start:
	$(call printActionTitle,Running the application)
	$(call printInfoBeforeStart)

	$(PROCESS_MANAGER) start index.js \
        -n $(PROJECT_NAME) \
        --no-autorestart \
        --log-date-format='YYYY-MM-DD HH:mm:ss.SSS'

# Restart the application
.PHONY: restart
restart:
	$(call printActionTitle,Restarting the application)
	$(call printInfoBeforeStart)

	$(PROCESS_MANAGER) restart $(PROJECT_NAME)

# Start or restart the application
.PHONY: startOrRestart
startOrRestart:
	@if ($(PROCESS_MANAGER) id $(PROJECT_NAME) | grep -E '[0-9]+'); then \
        make restart; \
	else \
        make start; \
	fi

# Stop the application
.PHONY: stop
stop:
	$(call printActionTitle,Stoping the application)

	$(PROCESS_MANAGER) delete $(PROJECT_NAME)

########################################################
###                    Debug rules                   ###
########################################################

# Show the current process
.PHONY: process.show
process.show:
	$(call printActionTitle,Application process)

	$(PROCESS_MANAGER) show $(PROJECT_NAME)

# Show logs
.PHONY: logs.show
logs.show:
	$(call printActionTitle,Application logs)

	$(PROCESS_MANAGER) logs $(PROJECT_NAME)
