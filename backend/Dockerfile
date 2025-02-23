# Use OpenJDK 21 as the base image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Install Maven to build the .jar file inside the container
RUN apt-get update && apt-get install -y maven

# Copy the pom.xml and source code to the container
COPY pom.xml /app/
COPY src /app/src/

# Build the .jar file
RUN mvn clean package

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
