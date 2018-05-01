# Architecture
The architecture should be cost effective, allow for rapid, agile development, and be performant.
This is also a learning experience so using a new set of technologies is a plus.

## Front End
Single page application (SPA) with focus on my name, link to my resume, and my email.

The page could be written in raw HTML or use a SPA framework/library like Angular or React.
In the case that I expand the website later on, I want to use a SPA framework/library.
Since I already have experience with Angular in the past
and Angular and React are the two most popular libraries/frameworks for SPAs, I will use React.

## Back End
The page doesn't require any backend functionality to run, but it needs to be hosted somewhere.

Since my current iteration of the website is hosted on AWS, I will continue hosting there.
To save on cost I will go serverless with only the required assets stored in S3.
In order to decrease latency I can setup CloudFront in front of my S3 bucket so that it can cache my assets.

The continuous integration (CI) pipeline can automatically build, test, and deploy the code in an S3 bucket.
The S3 bucket being pushed to will depend on what branch is being updated.
A `develop` branch updates the development bucket,
a `master` branch updates the staging bucket,
and a new `release-*` tag updates the production bucket.
