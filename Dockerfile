FROM ruby:3.1.3

RUN mkdir /ra_submane_server
WORKDIR /ra_submane_server
COPY . /ra_submane_server
RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]
