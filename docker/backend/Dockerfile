# Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Production stage & Argument setting
FROM amazoncorretto:21
ARG PROFILE=dev
ARG APP_VERSION=1.0.3

# Set environment variables
ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV JAR_VERSION=${APP_VERSION}
ENV ACTIVE_PROFILE=${PROFILE}

# Copy the JAR file from the build stage
WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8088

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${JAR_VERSION}.jar