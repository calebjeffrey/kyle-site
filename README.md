WHILEIMSTILLHERE.COM

####
github.com and heroku.com need to both receive site updates!

###COMMAND LINE TOOLS
1. google apple developer login
2. user: calebjeffrey.dev@gmail.com pass: Kairiangel01
3. go to developer.apple.com/downloads/
4. search for command line tools, download the command line tools for your specific OSX platform

###NODE TOOLS
1. nodejs.org/download
2. install latest version of node (Mac osx install :universal: )
3. type in '~/desktop/webroot/kyle-site' then type in 'npm install -g grunt-cli'

1. open terminal
2. type in 'cd desktop/webroot' hit enter
3. type in 'git clone https://github.com/calebjeffrey/kyle-site.git' hit enter
4. type in 'cd kyle-site'
5. type in 'npm install' ::this is gonna download a bunch of crap and take some time::
6. type in 'grunt dev' type in 'control c' to quit this process
7. open browser window to 'localhost:8000' and enjoy :)


####EXAMPLE EDIT AND SAVE TO GITHUB
In sublime: goto kyle site => static => js => app => data art.js
to comment out in any '.js' file use // at start of line OR highlight all the lines, and press 'cmd /'

to save changes on github:

make your changes in sublime, save those changes in sublime, next stuff is in terminal

type in 'git status' should see some red files that indicate they've changed
type in  'git commit -am "type some message here describing changes" ' hit enter
type in 'git status' <= just to make sure you have a commit ready to go up
type in 'git push' <= this will update codebase on github

####DEPLOYING TO HEROKU
1. download heroku cli tools: https://toolbelt.heroku.com/
2. while in the project root, aka, 'cd desktop/webroot/kyle-site', type in 'git remote add heroku  https://git.heroku.com/whileimstillhere.git'