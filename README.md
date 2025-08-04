# Dog Adoption Platform Project

Welcome to the Dog Adoption Platform project!

In this project, you have the exciting task of creating a backend service for a Dog Adoption Platform API. This experience will not only hone your backend development skills but also introduce you to real-world application development scenarios.

## What You Will Learn

- How to design and implement RESTful APIs using Node.js and Express.js.
- Best practices for securing APIs, including password hashing and token-based authentication.
- How to work with MongoDB to store and retrieve data, emphasizing data modeling.
- Implementing pagination and filtering to manage large datasets.
- Handling various edge cases and ensuring robust error handling.

Here, your goal is to build a secure, scalable, and user-friendly API that allows users to interact with a dog adoption platform, performing operations like registering, logging in, managing dog records, and adopting dogs.

Before starting, carefully read through all the requirements. Begin by designing your **data model** to support the functionalities described below. Then, proceed to develop the routes and controllers.

## Requirements

1. **User Registration:** Allow users to register with a username and password. Passwords should be hashed before storing in the database.
2. **User Authentication:** Enable users to log in using their credentials. Upon login, issue a token valid for 24 hours for subsequent authenticated requests.
3. **Dog Registration:** Authenticated users can register dogs awaiting adoption, providing a name and a brief description.
4. **Dog Adoption:** Authenticated users can adopt a dog by its ID, including a thank-you message for the original owner. Restrictions apply: a dog already adopted cannot be adopted again, and users cannot adopt dogs they registered.
5. **Removing Dogs:** Owners can remove their registered dogs from the platform unless the dog has been adopted. Users cannot remove dogs registered by others.
6. **Listing Registered Dogs:** Authenticated users can list dogs they've registered, with support for filtering by status and pagination.
7. **Listing Adopted Dogs:** Authenticated users can list dogs they've adopted, with pagination support.
8. **Error Handling and Edge Cases:** Anticipate and manage potential edge cases, providing appropriate HTTP status codes.
9. **JSON:** Ensure the application can parse JSON payloads.
10. **CORS:** Use an npm package to enable CORS for resource sharing across domains.
11. **Environment Variables:** Securely store sensitive information such as database credentials in environment variables.
12. **Layered Architecture:** Separate concerns by employing a layered architecture. The controller layer should manage routing logic, while the model layer should focus on database interactions. This promotes maintainability and scalability.
13. **Database Integration:** Use MongoDB Atlas for your cloud database needs. Integrate this database with your application to manage data.
14. **Testing:** Test the functionality of your API using mocha and chai libraries to ensure all endpoints work as expected.

The folder structure designed by our software architects ensures adherence to best practices:

- `controllers`: Contains the logic for handling incoming requests and returning responses to the client.
- `models`: Defines the data models and interacts directly with the database.
- `routes`: Manages the routes of your API, directing requests to the appropriate controller.
- `middlewares`: Houses custom middleware functions, including authentication and rate limiting.
- `.env`: Stores environment variables, such as database connection strings and the JWT secret.
- `app.js`: The main entry point of your application, where you configure the Express app and connect all the pieces.
- `db.js`: Manages the database connection.
- `package.json`: Keeps track of npm packages and scripts necessary for your project.

This structure provides a solid foundation for building a well-organized, scalable backend service. By separating concerns into dedicated directories and files, your project remains clean, navigable, and easier to debug and extend.

View the rubric for this assessment [here](https://storage.googleapis.com/hatchways.appspot.com/employers/springboard/student_rubrics/Dog%20Adoption%20Platform%20Rubric.pdf)

Dog Adoption Platform API Project Rubrics
Completion
    The API platform contains:
    ● New User Registration functionality
    ● User Authentication functionality for existing users
    ● New Dog Registration functionality
    ● Dog Adoption functionality
    ● Dog Removal functionality
    ● Dog Listing functionality for Registered Dogs
    ● Dog Listing functionality for Adopted Dogs
    There is a test folder with test cases for testing API endpoints
Process and Understanding
    ● The candidate demonstrates the understanding of Data Model Design by implementing a
    MongoDB Atlas cloud database or equivalent with a design that supports all functionalities,
    ensuring proper relationships and data structures for scalability and efficiency
    ● The candidate demonstrates the understanding of Database Integration by integrating
    MongoDB Atlas cloud database (or equivalent) service with the application seamlessly
    ● The candidate demonstrates the understanding of Authentication and Authorization by
    implementing user registration functionality with secure password hashing and user
    authentication using JWT tokens,issuing tokens valid for 24 hours and setting appropriate
    HTTP headers.
    ● The candidate demonstrates the understanding of Controller Design by implementing the
    following functionalities in the API layer in working condition by enabling:
        ○ New user registrations
        ○ Registered users to login using valid credentials
        ○ Authenticated users to register their dogs with name and description
        ○ Authenticated users to adopt dogs by ID, including handling restrictions and
        thank-you messages
        ○ Authenticated users (dog owners) to remove dogs based on their adoption status
        and ownership
        ○ Authenticated users to list their own dogs with support for filtering and pagination
        ○ Authenticated users to list their adopted dogs with support for filtering and
        pagination
    ● The candidate demonstrates the understanding of JSON Parsing by ensuring that the API
    can parse JSON payloads for request and response bodies.
    ● The candidate demonstrates the understanding of API Error Handling concepts by
    implementing robust coverage of invalid requests and returning appropriate HTTP status
    codes for errors
    ● The candidate demonstrates the understanding of API Testing concepts by implementing
    test cases for validating API across all endpoints using Mocha and Chai libraries, or any
    equivalent testing library.
Presentation
    ● Variable names accurately represent the values they store
    ● Variable names follow the best practices for the programming language used (camelCase in
    case of JS)
    ● Variable names are easy to read and understand
    ● Comments are present when necessary