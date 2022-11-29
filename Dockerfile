FROM ruby:3.1.3

RUN mkdir /mucha
WORKDIR /mucha
COPY . /mucha
RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]
