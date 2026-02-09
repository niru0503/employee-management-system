# Multi-stage Dockerfile for building and running the Spring Boot backend
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy Maven wrapper and pom first for dependency caching
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Copy source and build
COPY src src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app

# Copy the application jar from the build stage. Uses glob to pick the built jar.
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
