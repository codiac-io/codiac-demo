FROM node:13.10.1 AS build

## We do the build outside of the image and simply drop the assets in the appropriate folder
RUN mkdir /app
WORKDIR /app
COPY /dist/ /app/

# ## Set up the static resouce server for the browser (the spa)
# FROM nginx:1.16.1 AS frontend-browser
# COPY --from=build /app/angular/browser/ /usr/share/nginx/html
# COPY ./devops/nginx.conf /etc/nginx/nginx.conf


FROM node:13.10.1-alpine AS ssr-server
COPY --from=build /app /app/dist/
COPY /package.json /app/package.json
WORKDIR /app
EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
CMD npm run serve:ssr