Welcome to GTRideshare 1.0.0! GTRideshare lets members of the GT community post their commute information (POSTS) for carpooling purposes. If you are in need of a ride, or are looking for a carpooling buddy, this app is for you! Users can view others’ posts and request a match if they want to carpool. Contact details are then shared to facilitate carpooling. Have fun carpooling!

Features:
-Navigate and view various POSTS made by users for rides to/from campus and the Atlanta area

-Design and make POSTS of your choice

-Request contact of users you want to match with

-Simple, neat, streamlined UI

Carpool. Drive. Save.

Installation Instructions:

The source code can be run on any platform. A phone or tablet with expo app installed works as 
a good supplement.

Setting up server and required libraries:
Node 10+ is used along with Firebase, Redux and React
1. Install Node 10+ from https://nodejs.org/en/download/current/
2. Open up shell/command line
3. Run npm install -g expo-cli
4. Run npm install -S redux react-redux redux-thunk
5. Run npm install -g firebase
6. Run npm install -g react-thunk

Note that you mant already have some of these libraries installed

Download and Running Source Code:
1. Open up shell/command line
2. Run git clone https://github.com/jacksoncook/gtRideshare.git
3. Navigate to the directory and run npm install 
4. Run expo start (Ensure you are connected to the internet)
Setting up phone
1. Go to App Store/Google Play Store and install app Expo
2. Open up app once installed and scan QR code shown in shell if using Android. 
3. If using IOS, go to camera app and scan QR code with phone camera.

App should run on the phone

Troubleshooting:
In case you haven't installed some of the libraries, you may run into errors like
"unable to resolve module 'firebase'"
You can run npm install firebase within the directory and try again.
