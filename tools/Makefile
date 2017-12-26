#
#    Application:
#
#    		start              Start an application
#    		restart            Restart an application
#    		startOrRestart     Start or restart an application
#    		stop               Stop an application
#

########################################################
###                     Variables                    ###
########################################################

# Scripts directory
SCRIPTS_DIR := @ . node_modules/app-core/tools/scripts

# Application script
SCRIPT_APP := $(SCRIPTS_DIR)/application

########################################################
###                Application rules                 ###
########################################################

# Start an application
.PHONY: start
start:
	$(SCRIPT_APP) start

# Restart an application
.PHONY: restart
restart:
	$(SCRIPT_APP) restart

# Start or restart an application
.PHONY: startOrRestart
startOrRestart:
	$(SCRIPT_APP) startOrRestart

# Stop an application
.PHONY: stop
stop:
	$(SCRIPT_APP) stop
