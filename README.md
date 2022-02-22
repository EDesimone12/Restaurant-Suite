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

<img src="https://github.com/EDesimone12/Restaurant-Suite/blob/main/readmeIMG/CloudArchi.drawio.png" alt="Project architecture">

---
# :rocket: Installation :computer:
First of all it is necessary an Azure Subscription and you need to clone our repository.   
```bash
git clone https://github.com/EDesimone12/Restaurant-Suite.git
```
Create the resources used on the azure portal through the [Azure CLI](https://docs.microsoft.com/it-it/cli/azure/install-azure-cli) or the [online platform](https://azure.microsoft.com/en-gb/account/).


## Azure Database for MySQL Server
Start the creation of the resources, 
choose the names that suit your needs for every __< param >__ :     
First the resource group
```bash
az group create --name <myresourcegroup> --location <westus>
```
Then the Azure MySQL Server
```bash
az mysql server create --resource-group <myresourcegroup> --name <mydemoserver> --location westus --admin-user <myadmin> --admin-password <server_admin_password> --sku-name GP_Gen5_2
```
The creation of the database on the Azure MySQL Server created
```bash
az mysql db create --resource-group <myresourcegroup> --name <demo> --server-name <mydemoserver>
```

If you want to set Firewall rules
```bash
az mysql server firewall-rule create --resource-group <myresourcegroup> --server <mydemoserver> --name <AllowMyIP> --start-ip-address <192.168.0.1> --end-ip-address <192.168.0.1>
```
Other information on the Azure MySQL Server at the official link [here](https://docs.microsoft.com/en-gb/azure/mysql/quickstart-create-mysql-server-database-using-azure-cli)!   

## AppServices(WebApp)
Follow these simple steps for the WebApp creation!
1.  Go to the [home](https://portal.azure.com/#home)   
2.  Press "Create a resource"   
3.  Choose App Service WebApp  
4.  Insert all the information about the WebApp configuration:
    > Your subscription      
    > Resource Group Name (the previous one)     
    > Publish: Code    
    > Runtime stack: Java 11    
    > Java webserver stack: Tomcat 9.0    
    > Operating system: Windows    
    > Region: West Europe    
    > SKU: Free    
    > ASP Name: <your-asp-name>    
    > GitHub Account: <your-account-name>    
    > Organization: <your-organization-name>    
    > Repository: <your-repository>    
    > Branch: <your-branch-name>    
5. Have fun with your best IDE and its Azure plugin as at the link [here](https://docs.microsoft.com/en-gb/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-windows), our configuration was [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows) with the [Azure toolkit plugin](https://plugins.jetbrains.com/plugin/8053-azure-toolkit-for-intellij/).
## Serverless Function
 In order to start the (creation - working - deploying)  process, you have to:
  * Download [Node.js 16.x](https://nodejs.org/en/download/releases/)
  * Download [Visual Studio Code](https://code.visualstudio.com)
  * Install [Visual Studio Code Azure plugin](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
  * Instal [Azure Function Core Tools 4.x](https://docs.microsoft.com/it-it/azure/azure-functions/functions-run-local?tabs=v4%2Cwindows%2Ccsharp%2Cportal%2Cbash#install-the-azure-functions-core-tools) based on your system.     

  Let's start!
  
  1. Login into Azure using the Azure plugin    
  2. Create a New Project using the Azure plugin(Function Area)    
  3. You can now edit and run your function locally    
  4. Use the deploy button of the Azure plugin for an easily deploy
  
 Official Microsoft Azure Guide about Serverless function [here](https://docs.microsoft.com/it-it/azure/azure-functions/create-first-function-vs-code-node)
  
