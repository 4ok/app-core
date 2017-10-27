#
#    Application:
#
#    		start              Start the application
#    		restart            Restart the application
#    		startOrRestart     Start or restart the application
#    		stop               Stop the application
#

########################################################
###                     Variables                    ###
########################################################

# Tools directory
TOOLS_DIR := @ . node_modules/app-core/tools

# Application tool
APP_TOOL := $(TOOLS_DIR)/application

########################################################
###                Application rules                 ###
########################################################

# Start the application
.PHONY: start
start:
	$(APP_TOOL) start

# Restart the application
.PHONY: restart
restart:
	$(APP_TOOL) restart

# Start or restart the application
.PHONY: startOrRestart
start.or.restart:
	$(APP_TOOL) startOrRestart

# Stop the application
.PHONY: stop
stop:
	$(APP_TOOL) stop
