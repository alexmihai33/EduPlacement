# EduPlacement

# Description - what does EduPlacement solve?

This is a full-stack application that is meant to solve a specific issue in the romanian educational system.
Every year, there is a process happening called the inclusion project in pre-university education. 
This process is meant to help assign teachers to schools and their respective classes, and it is a complicated procedure that involves the schools and the school inspectorate from a county.
The schools need to complete a series of tables with a high load of information - the information inside the tables come from the ministry of education. Currently, the schools complete these tables in excel format.
After completion, the schools send the tables (currently, printed, mostly in physical form) towards the inspectorate. The inspectorate's scope is to validate the data sent by the schools.
The current approach creates a high ammount of extra work for the people involved in the process, as the inspectorate needs to verify each table on physical paper, and the data is decentralized.

EduPlacement digitalizes and centralizes this whole process, while bringing useful functionalities such as data validation with A.I., real-time messaging system between schools and inspectorates, a friendly interface with many quality of life features, and many more.

PLEASE NOTE: the application is specifically destined towards the romanian education system, hence most of the text inside it is written in romanian.


# Installation

In order to run this project locally, please follow these steps:

  1. Fork the repository on to your machine
  2. Open the "frontend" folder in Visual Studio Code (or the editor of your choice) and run "npm install". You can then run the Frontend with npm "npm run dev".
  3. Create a database utilizing the "PGScript" file (PostgreSQL was utilized for this project).
  4. Open the "backend" folder in IntelliJ IDEA (or the IDE of your choice) and, in the "Application Properties" file (found at src -> main -> resources) replace the Database credentials with your own.
  5. Run the Backend through BackendApplication 
  6. You are now ready to navigate this project at localhost:5173


# Languages / Frameworks used

Frontend: React + Typescript

Backend: Spring Boot + Java

Database: PostgreSQL

Other used technologies worth mentioning: Gemini, Auth0, WebSocket, MUI, Apache POI, Docker.


# Walkthrough

### How does the application works? 
Firstly, users are stored and manipulated with Auth0, a modern and secure IAM technology, using the auth0-react library.
Through Auth0, users have roles and metdata stored. A user can have two roles: school or inspectorate. If their role is school, they also have an additional metadata that indicates the school they are a part of.
This data is added to an ID Token through an Auth0 script, and the ID Token is passed towards the application for further manipulation.

After authenticating, the user lands on the main Dashboard (there is a Dashboard for the school users, and a Dashboard for the inspectorate users - they land on one of them depending on the role).

  1. If the user has the school role, their Dashboard contains a huge section where they can choose the table they want to complete (the tables that are forced by the ministry). They can insert new rows into the table, delete them, save data or update existing data.
The user can make the table full screen, for better visibility. They can also call "EDU A.I." - which is a Gemini Wrapper that introduces the whole table, alongside a strict set of rules for data correction towards the Gemini API, and the returns a set of recommendations for which data is not correctly set.
This set of rules should be conformant to romanian law. The user can also export the current table in excel format. Moreover, there is a messaging system, that can be opened in the down-right corner, and they can send/receive messages from an inspectorate account. 
Also, in the lower side of the page they have a set of instructions on how to use the platform's functionalities.
  2. If the user has the inspectorate account, their Dashboard is similar to the one from a school account, having all the above functionalities, but, they can not complete the tables themselves. 
They can choose between the school they view the tables from, and based on the school chosen, their messaging system changes, to only send messages to the school accounts that they are currently viewing.

### Homepage:

This is the page that the user is greeted on. This is a page that requires no authentication (alongisde with a few other auxiliar pages, seen in the navbar, such as a support page, guide or news).
The page tells the user that they should authenticate, and, once they do, the page tells the user that they are authenticated.

On the screenshot below, we can also notice the navigation bar - containing the pages where you can navigate (pre-authentication), alongside the Login button.

![image](https://github.com/user-attachments/assets/fdebab06-fbe5-4b78-a959-24e3b4235c17)


### School Dashboard

As presented in the "How does the application work" section, this is the School Dashboard, that presents a school account with all the necessary functionalities.
We can see that the navigation bar now also contains the "Dashboard" tab, alongside a "Profile" tab with the user's information.

![image](https://github.com/user-attachments/assets/326e7964-835a-48ff-8293-27fa4d5c3890)


### Inspectorate Dashboard

This is the Dashboard presented to an inspectorate account:

![image](https://github.com/user-attachments/assets/7acfa7e3-802c-4304-ad11-fc27c071ce99)


### Gemini Wrapper

This is the modal that opens when a user clicks on the "EDU A.I." button, that sends the current table alongside rules to Gemini's API, for change recommendations.

![image](https://github.com/user-attachments/assets/1d6ae275-2fe4-4e63-a937-1a67c0e304f8)


### Messaging systems

This is the messaging window, that facilitates easier communications between schools and inspectorates:

![image](https://github.com/user-attachments/assets/e03e29dd-0d1e-40d4-ad77-c656d385e75b)


# Thank you for reading!


