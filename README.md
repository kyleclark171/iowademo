# iowademo

This is a simple node.js task list app. This demo is focused around setting up a local node.js environment, and then hosting the application within AWS. Instructions on both of these tasks are contained in this dodument.

### Contents
* [Running the Application Locally](#running-the-application-locally)
* [Deploying to AWS](#deploying-to-aws)

## Running the Application Locally

### Installing the Tools

* [Node JS](https://nodejs.org/en/download/)
* [DynamoDb](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

### Starting the application

1. Clone the code from this repo
2. Open a command prompt window (Terminal on Mac) 
3. Run your local copy of dynamoDB. In its current version the command is `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`
    * If you are unable to run DynamoDB, ensure that java is installed on your machine. Download can be found [here](https://java.com/en/)
4. Open another command prompt window (Terminal on Mac) and navigate to the source directory (the directory containing the `app.js` file)
5. Run `npm install` in repo folder 
5. Run `node app.js`
6. Open a browser window, and go to [http://localhost:3000](http://localhost:3000)

## Deploying to AWS
1. Create Deployment artifact for Elastic Beanstalk
    * Windows - place the contents of the repo folder into a zip file
    * Mac - open a terminal and run `zip ../todoApp.zip -r * .[^.]* ` in the project directory
2. Login to the AWS console (Create account if you don't have one)
3. Create your application with elastic Beanstalk
	1. Click on the Elastic Beanstalk Service (Under compute)
	2. Choose 'Get Started'
	3. Enter in an application name, and select NodeJS as the platform
	4. Select 'Upload your code' and upload the .zip file created in step 1
	5. Click 'Create Application'
4. Configure you application permissions
	1. Click on the 'Services' dropdown in the top left of the screen, and select 'IAM' 
		* This service can be found under 'Security, Identity & Compliance'
		* IAM stands for Identity and Access Management
	2. Select 'Roles' from the left menu and click on the `aws-elasticbeanstalk-ec2-role` role
	3. Under the 'Permissions' tab, click 'Attach Policy'
	4. Select 'AmazonDynamoDBFullAccess', and click 'Attach Policy'
5. Return to the Elastic Beanstalk service and select the application you just deployed
6. Navigate to the application URL (Should be provided at the top of the screen) and try out the application
