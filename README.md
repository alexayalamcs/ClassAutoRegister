# ClassAutoRegister

This chrome extension will ~~spam~~ reload WWU's registration page until your account is able to register, it'll then submit your selected CRNs and submit all for you.

## Usage

* 1 - Clone this repo

* 2 - Edit 'content.json', and edit the first line with the CRNs you wish to register for.
For example, if you wish to take 34252, 88997, and 01234, the first line should look like 'var crnNumbers = ["34252", "88997", "01234"];' 
NOTE: You can enter up to 10 crns in this array, for waitlist purposes!

* 3 - If you want to adjust the refresh rate, edit the third line.
For example, if you want to have no chill and refresh ridiculously fast, line 3 should look like 'var refreshDelay = 0;'

* 4 - If you want to adjust the submit speed (wouldn't reccomend it), adjust line 4. 
For example, for a speed of 1 second, do 'var submitChangesDelay = 1000;'

* 5 - Finally after configuring it, save the file and go to chrome, settings, extensions, enable developer mode, and then load unpacked extension and select the "Registration Extension" Folder

* 6 - Go ahead and go to mywestern -> web4 -> student -> registration

* 7 - At this point the screen should spam back and forth, waiting for the page to be unlocked. It may ask for your term to register for at first, go ahead and confirm the term and hit submit.

* 8 - Relax now! As soon as the page unlocks, everything will auto submit :)

NOTE: PLEASE make sure you can either register or waitlist for all your selected CRNs. Using CRNs which you are not allowed to register for, conflicting time slots, or other issues will cause this extension to constantly hit submit. 

// TODO: Don't hit submit if there is a issue ;_;