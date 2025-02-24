# Use the official Nginx image
FROM nginx:alpine

# Copy the build output from your React app into Nginx's public folder
COPY dist/ /usr/share/nginx/html

# Expose port 80 (Nginx's default port)
EXPOSE 80

# Command to run Nginx in the foreground (keeps the container running)
CMD ["nginx", "-g", "daemon off;"]
