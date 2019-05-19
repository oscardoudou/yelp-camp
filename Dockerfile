FROM node:latest
RUN mkdir -p /yelp-camp
WORKDIR /yelp-camp
COPY . /yelp-camp
RUN npm install
ENV PORT=3000
ENV IP=0.0.0.0
EXPOSE 3000
# RUN chmod +x wait.sh
# 1. how to run script as last stmt: why I can't execute script as the last statement in dockerfile, why it has to be npm start to make it work?
# 2. how can I execute the script check my db connection ready then proceeed
# 3. I know CMD doesn't actually run whne build, but why all other operation like run does execute during build phase?
# CMD ["./wait.sh"] 
CMD ["npm", "start"]
