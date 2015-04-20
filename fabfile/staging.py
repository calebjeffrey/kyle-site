from fabric.api import local
from fabric.api import task

from . import loc, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY



# @todo - repeated code; between prod / staging -> cleanup

# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#

BRANCH_NAME = 'staging'
AWS_STORAGE_BUCKET_NAME = 'kluft-staging'
PUBLIC_READ = True


# ----------------------------------------------------------------------------#
# PRODUCTION DEPLOMENT -------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def deploy(force_all=False, gzip=False):
    current_branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
    if current_branch != BRANCH_NAME:
        print('not on the right branch, you are on %s', current_branch)
        return
    loc.css_compile();
    loc.clone_project();
    loc.js_compile()
    loc._deploy_s3( force_all=force_all,
                    ID=AWS_ACCESS_KEY_ID,
                    key=AWS_SECRET_ACCESS_KEY,
                    bucket=AWS_STORAGE_BUCKET_NAME,
                    public_read=PUBLIC_READ,
                    gzip=gzip)
