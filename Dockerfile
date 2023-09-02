FROM ruby:3.1.3

ENV TZ=Asia/Tokyo

RUN mkdir /mucha
WORKDIR /mucha
COPY . /mucha
RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]
