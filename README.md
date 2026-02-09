# Employee Management System

A full-stack web application for managing employees with role-based access control, JWT authentication, and a modern Angular frontend.

## 📋 Features

- **User Authentication** - Secure login with JWT tokens
- **Employee Management** - Create, read, update, and delete employee records
- **Role-Based Access Control** - Different permissions for different user roles
- **Responsive UI** - Modern Angular-based frontend
- **Docker Support** - Containerized backend and frontend
- **RESTful API** - Well-documented REST endpoints
- **Database Management** - MySQL with Spring Data JPA

## 🛠️ Tech Stack

### Backend
- **Java 17** - Latest Java LTS version
- **Spring Boot 4.0.2** - Modern Spring framework
- **Spring Data JPA** - ORM with Hibernate
- **MySQL 8.0** - Relational database
- **JWT (JSON Web Tokens)** - Secure authentication
- **Maven** - Dependency management

### Frontend
- **Angular 16** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Bootstrap/CSS** - Responsive styling
- **RxJS** - Reactive programming
- **Angular Router** - Client-side routing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Java 17** - [Download](https://adoptopenjdk.net/)
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Maven** (3.6+) - [Download](https://maven.apache.org/)
- **MySQL** (8.0+) - [Download](https://www.mysql.com/)
- **Docker** (optional) - [Download](https://www.docker.com/)

## 🚀 Quick Start

### Clone the Repository

```bash
git clone <your-repo-url>
cd "Employee Management System BATCH 12"
```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd employee-backend
   ```

2. **Configure MySQL Database**
   - Create a database named `employee_db`
   - Update `src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
     spring.datasource.username=root
     spring.datasource.password=your_password
     spring.jpa.hibernate.ddl-auto=update
     ```

3. **Build the application**
   ```bash
   mvn clean build
   ```

4. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd Fronted/Employee-Mangement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:4200`

## 🐳 Docker Setup

### Using Docker Compose

1. **Build and run both services**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:8080`

3. **Stop the services**
   ```bash
   docker-compose down
   ```

### Individual Docker Containers

**Backend:**
```bash
cd employee-backend
docker build -t employee-backend:latest .
docker run -p 8080:8080 employee-backend:latest
```

**Frontend:**
```bash
cd Fronted/Employee-Mangement
docker build -t employee-frontend:latest .
docker run -p 4200:4200 employee-frontend:latest
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/login` | User login |
| `POST` | `/api/v1/auth/register` | User registration |

**Login Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Employee Endpoints

All employee endpoints require JWT authentication (include token in Authorization header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/employees` | Get all employees |
| `GET` | `/api/v1/employees/{id}` | Get employee by ID |
| `POST` | `/api/v1/employees` | Create new employee |
| `PUT` | `/api/v1/employees/{id}` | Update employee |
| `DELETE` | `/api/v1/employees/{id}` | Delete employee |

**Authorization Header:**
```
Authorization: Bearer <your_jwt_token>
```

### Project Structure

```
Employee Management System BATCH 12/
├── employee-backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/
│   │   │   │       └── employee_backend/
│   │   │   │           ├── controller/
│   │   │   │           ├── service/
│   │   │   │           ├── repository/
│   │   │   │           ├── model/
│   │   │   │           ├── security/
│   │   │   │           └── config/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/
│   ├── pom.xml
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── BACKEND_FLOW.md              # Backend architecture documentation
│
├── Fronted/                          # Angular frontend
│   ├── Employee-Mangement/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   ├── models/
│   │   │   │   ├── guards/
│   │   │   │   └── interceptors/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── package.json
│   │   ├── angular.json
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   ├── db.json                       # Mock JSON database
│   ├── package.json
│   └── server.js
│
└── README.md                         # This file
```

## 🔐 Authentication Flow

1. User submits login credentials
2. Backend validates credentials against database
3. JWT token is generated (signed with secret key)
4. Token is returned to client
5. Client stores token in localStorage
6. For subsequent requests, token is sent in Authorization header
7. Backend validates token before processing request

## 📝 Default Credentials

For development purposes:

```
Username: admin
Password: admin123
```

⚠️ **Note:** Change these credentials in production!

## 🧪 Testing

### Backend Tests
```bash
cd employee-backend
mvn test
```

### Frontend Tests
```bash
cd Fronted/Employee-Mangement
npm test
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

## 🔗 Additional Resources

- [Backend Flow Documentation](employee-backend/BACKEND_FLOW.md)
- [Backend Help Documentation](employee-backend/HELP.md)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Last Updated:** February 2026

Happy coding! 🚀
