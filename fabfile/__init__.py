# AWS_ACCESS_KEY_ID = 'AKIAI2AX3DCIAPIWQQEQ'
# AWS_SECRET_ACCESS_KEY = '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'

from fabric.api import env

import staging, dev, local, production

import os

env.roldefs = {
               'staging': [''],
               'production': ['']
}

env.use_ssh_config = True


