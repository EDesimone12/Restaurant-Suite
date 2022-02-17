# :fork_and_knife: Restaurant-Suite :wine_glass:
<img src="https://github.com/EDesimone12/Restaurant-Suite/blob/main/readmeIMG/logo.png" alt="Restaurant-Suite logo">

The project is a suite for managing restaurant reservations, it is composed of two systems:
* A __Telegram Bot__ for the user, which allows you to make and remove reservations, view information about the restaurant and the menu (Italian - English - Spanish), search the menu using image or text, order dishes;
* A __Web App__ that shows restaurant information and instructions for using the Telegram Bot, and the admin (restaurant owner) can access and delete reservations through a special section;
---
#  :cloud: Azure Services :zap:
* __BotServices:__ Service used for the creation and management of the Telegram bot used by our users. 
* __Computer Vision:__ Service used for the recognition of dishes in our Restaurant Menu, using through the bot by uploading an image.
* __Azure Database for MySQL Server:__ An Azure resource representing an instance of a MySQL database, used by the Telegram Bot and the WebApp for storing information.
* __App Services:__ An hosting service used by either Telegram Bot & WebApp.
* __Translator:__ Translation service used by Telegram Bot for the Restaurant Menu Translation.
* __Serverless Function:__ Triggered by the database to confirm the reservation to the user.
* __Serverless Function:__ Triggered 30 minutes before booking time as a reminder to the user.

---
# :wrench: Project architecture :nut_and_bolt:

---
# :rocket: Installation :computer:
