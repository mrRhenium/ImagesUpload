# ImagesUpload

1. OBJECTIVE : Cross site Images Upload functionality

--> we Upload the quesions with images through frontent server running on port no. 5500

--> firstly quesion goes at server running on 3000 which is our main_server.

--> we also have the secondary server which is known as media_server , all the images store on it.

<!----- With the help of secondary Server ------>

a). Reduce the load on main_server.
b). Achieve flexibility.
c). Economicaly benificial for us.

<!-- OBJECTIVE ENDS HERE -->

2. Types of Technologies we Use

   a). Cors package (Cross Origin Resource Sharing)

   --> whenever we fetch some data from one origin (domain) to another origin , we need to implement cors setup instead if give cors policy error
