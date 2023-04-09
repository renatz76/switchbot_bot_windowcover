# switchbot_bot_windowcover
Sync two switchbots bots to work as a window cover controller

step 1
mkdir homebridge-switchbot
cd homebridge-switchbot
npm init -y
npm install homebridge switchbot-api

step 2
install plugin

step 3
Edit your Homebridge config.json file to include the following accessory configuration:
{
  "accessories": [
    {
      "accessory": "SwitchbotWindowCover",
      "name": "Window Cover",
      "switchbot1_address": "<SWITCHBOT_1_MAC_ADDRESS>",
      "switchbot2_address": "<SWITCHBOT_2_MAC_ADDRESS>"
    }
  ]
}

step 4
Replace the switchbot1_address and switchbot2_address variables with the MAC addresses of your two SwitchBots.
