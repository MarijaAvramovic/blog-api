# blog-api
Structure of this project is:
separate GitHub repos for each of the three apps, to keep them and their commit histories separate.  


Back end models and schemas: prisma express. 

The blog has users, posts and comments,
fields:


Users required  to leave a username with their comments.

Display a date or a timestamp for posts and comments.

Posts have a title.

A useful feature for a blog is the ability to have posts that are in the database but not published. 

User model contain any blog authors and any normal user accounts. enum basic admin. a minimal user model will still be helpful to allow for easier route protection via authentication.


Set up your Express app, and define the models in Prisma.


Set up your routes and controllers! Think about RESTful organization for this one. 

Used Postman platform that allow you to send PUT and POST requests without needing to set up and fill out HTML forms.  

Certain routes will need to be protected via authentication. You wouldn’t want any random stranger online to edit your articles! If you also implement normal user accounts then you may also want to protect some routes behind being logged in.
Though there are many ways you can handle authentication, in this project, use JWTs.


You can use jsonwebtoken to create and verify JWTs. You may wish to use Passport’s JWT strategy for verifying JWTs, especially if you already have Passport set up with a local strategy to handle logging in.


A successful login will grant the user a JWT. That user can then attach their JWT to any future requests, where your API can verify the JWT in order to allow or deny access to the rest of the protected route.

 When the user logs out, you can have the client remove the JWT from storage.
 
There are many ways to send and store JWTs, such as via cookies, storing in localStorage, using access/refresh tokens etc. Some of these methods are more complicated (though with the right implementation, potentially more secure), especially once you deploy both ends. For example, cross-site cookies can be a real headache if you aren’t aware of certain extra details. You may wish to explore some of these alternatives in the future. For now, keep it simple and send your JWTs via an “Authorization” header with “Bearer” schema, and have the client store a JWT in localStorage.
Once your API is working you can focus on your front-end code. Really, how you go about this is up to you. If you are comfortable with React, then go for it! If you’re happier using plain HTML, CSS and vanilla JavaScript, that’s fine too. All you should have to do to get your posts into a website is to fetch the correct API endpoint and then display the results. Working with fetch and APIs from a front-end perspective is covered in the Working with APIs lesson.
Create a second website for authoring and editing your posts. You can set this up however you like but the following features might be useful:
A list of all posts that shows whether or not they have been published.
A button to publish unpublished posts, or to unpublish published ones!
A ‘NEW POST’ form. If you want to get fancy, you could use a rich text editor such as TinyMCE.
The ability to manage comments (i.e. delete or edit them).
How much work you want to put into the front-end code on this one is up to you. Technically this is a backend focused course so if you would prefer, feel free to focus on the REST API.
Deploying your separate apps isn’t anything fancy. Deploy your API like with your previous projects using a PaaS from the Deployment lesson, and deploy your front-ends like you would have deployed your front-ends before. If you used React, recall several hosting options from the CV Application project.