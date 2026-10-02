# Smart Clinic Management System Architecture

## Section 1: Architecture Summary

The Smart Clinic Management System is a Spring Boot application that uses both MVC and REST controllers. Thymeleaf controllers are used for the Admin and Doctor dashboards to provide server-rendered HTML pages. REST controllers provide APIs for other modules and return data in JSON format.

The controllers communicate with a common service layer that handles the business logic and then communicates with the appropriate repository. The application uses two databases. MySQL stores structured data such as patients, doctors, appointments, and admin records using JPA entities. MongoDB stores prescription data using document models.

## Section 2: Numbered Flow of Data and Control

1. The user accesses the application through a Thymeleaf-based dashboard or a module that communicates with a REST API.

2. The user's request is routed to the appropriate controller. Thymeleaf controllers handle requests for HTML pages, while REST controllers handle API requests and return JSON data.

3. The controller calls the service layer, which handles the application's business logic, validations, and workflows.

4. The service layer communicates with the appropriate repository to retrieve, save, update, or delete data.

5. The repository accesses the appropriate database. MySQL stores structured data such as patients, doctors, appointments, and admin records, while MongoDB stores prescription data.

6. Data retrieved from MySQL is mapped to Java JPA entities using `@Entity`, while data retrieved from MongoDB is mapped to document objects using `@Document`.

7. The application returns the processed data to the user. In an MVC flow, the model is passed to a Thymeleaf template and rendered as HTML. In a REST flow, the model or DTO is serialized into JSON and returned to the API client.