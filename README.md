#Heroku
Link: https://prime-boards.herokuapp.com/

Admin username is "Admin" and the password is "password"

#Challenge
Hey Everyone!

Congrats on closing up week 4! Certainly an intense week and I am beyond proud of how well you all are doing.

For this assignment, you are going to create an online message board. The core experience of the app should:
User navigates to the page, and is greeted with:
A name entry field,
A message entry field,
A post button,
A refresh button
Clicking on the post button, should extract the information off the form and send that information to the server. The server should write this information to the database. Note: You will need to adjust the Schema we used in class to take in another value.
Upon successfully posting to the server, the message board should update with the new messages.
The refresh button should get the messages off the server and update the DOM accordingly. This is to account for if anyone else has posted messages outside of your client side experience. 
Finally, create a router that when a specific path of your choice is accessed, it serves up the same experience, but with a delete button. 

For example, localhost:5000 would serve the regular experience,
localhost:5000/secret would serve up the experience with the delete buttons.

The delete buttons should delete the messages from the board and the database. 

##HARD MODE
Read through the provided documentation on Hooking up MongoLabs into Heroku. Post your application to Heroku which will access the MongoLabs storage system to provide you a server for your persistent data.

Link to Doc

##PRO MODE
jQuery Effects! Styling! Bootstrap! Spice the whole experience up with some styling and animation. Include a nice little fade out when the delete button is clicked. An additional requirement of Pro Mode is that include some sort of delete confirmation when the delete button is clicked. Ask the user if they are sure they want to delete. Finally, include date information of when each post was created (no big deal on that ;) )