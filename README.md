# iowademo

This is a simple node.js task list app. This demo is focused around setting up a local node.js environment, and then hosting the application within AWS. Instructions on both of these tasks are contained in this dodument.

### Contents
* Running the Application Locally
* Deploying to AWS

## Running the Application Locally

### Installing the Tools

* Node JS -- (Insert link to online instructions)
* DynamoDb -- (Insert link to online instructions)

### Starting the application

1. Clone the code from this repo
2. Open a command prompt window (Terminal on Mac) 
3. Run your local copy of dynamoDB. In its current version the command is `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`
4. Open another command prompt window (Terminal on Mac) and navigate to the source directory (the directory containing the `app.js` file)
5. Run `npm install` in repo folder 
5. Run `node app.js`
6. Open a browser window, and go to [http://localhost:3000](http://localhost:3000)

### Deploying the Application to AWS

1. Login to the AWS console
2. Go to IAM  and give your `aws-elasticbeanstalk-ec2-role` Dynamo permissions: `AmazonDynamoDBFullAccess`
3. Create Deployment artifact for Elastic Beanstalk
    * Windows - place the contents of the repo folder into a zip file
    * Mac - run `zip ../todoApp.zip -r * .[^.]* `
4. Go to Elastic Beanstalk and create your application 
