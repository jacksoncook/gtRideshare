Installation Instructions:

The source can be run on any platform. A phone or tablet with expo app installed works as 
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
3. Navigate to the directory and run expo start (Ensure you are connected to the internet)
Setting up phone
1. Go to App Store/Google Play Store and install app Expo
2. Open up app once installed and scan QR code shown in shell

App should run on the phone

Troubleshooting:
In case you haven't installed some of the libraries, you may run into errors like
"unable to resolve module 'firebase'"
You can run npm install firebase within the directory and try again.
