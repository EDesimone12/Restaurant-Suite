# :fork_and_knife: Restaurant-Suite :wine_glass: [![Build and deploy - RestaurantSuite](https://github.com/EDesimone12/Restaurant-Suite/actions/workflows/develop_restaurantsuite.yml/badge.svg)](https://github.com/EDesimone12/Restaurant-Suite/actions/workflows/develop_restaurantsuite.yml)

<img src="https://github.com/EDesimone12/Restaurant-Suite/blob/main/readmeIMG/logo.png" alt="Restaurant-Suite logo">

The project is a suite for managing restaurant reservations, it is composed of two systems:
* A __Telegram Bot__ for the user, which allows you to make and remove reservations, view information about the restaurant and the menu (Italian - English - Spanish), search the menu using image or text, order dishes;
* A __Web App__ that shows restaurant information and instructions for using the Telegram Bot, and the admin (restaurant owner) can access and delete reservations through a special section;
---
#  :cloud: Azure Services :zap:
* __BotService:__ Service used for the creation and management of the Telegram bot used by our users. 
* __Computer Vision:__ Service used for the recognition of dishes in our Restaurant Menu, using through the bot by uploading an image.
* __Azure Database for MySQL Server:__ An Azure resource representing an instance of a MySQL database, used by the Telegram Bot and the WebApp for storing information.
* __App Services:__ An hosting service used by either Telegram Bot & WebApp.
* __Translator:__ Translation service used by Telegram Bot for the Restaurant Menu Translation.
* __Serverless Function:__ Triggered by the database to confirm the reservation to the user.
* __Serverless Function:__ Triggered 30 minutes before booking time as a reminder to the user.

---

# :wrench: Project architecture :nut_and_bolt:
The Telegram Bot implemented through __"BotService"__, and the WebApp implemented through the __"App service"__ access the data stored in a Database through the __"Azure Database for MySQL Server"__ service.  
The Telegram Bot uses the __"Computer Vision"__ service to recognize a photo of dishes, to determine their presence in the menu.  
Use the __"Translator"__ service to translate the menu.  
Furthermore, thanks to two __Serverless functions__, the notification of the booking and a booking reminder are implemented.  
The user will then use the system through the Telegram Bot or through the WebApp and the admin will use the system through the WebApp, specifically it will have a dedicated section for managing reservations.  

---
# :rocket: Installation :computer:
