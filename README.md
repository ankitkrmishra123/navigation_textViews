I am providing a concise summary of how to run the Nested Tags Tree application fully. This summary will be easier to follow.

Here's a summary to run the Nested Tags Tree application:

Prerequisites:

Ensure to have Node.js (v14+), Python (v3.7+), and PostgreSQL (v12+) installed on system.

Database Setup:
Create a new PostgreSQL database named nested_tags_tree
Create a user with appropriate permissions for this database

Backend Setup:
Open a terminal and navigate to the backend directory
Create and activate a Python virtual environment:
python -m venv venv
source venv/bin/activate

Install required Python packages:
pip install -r requirements.txt

Open main.py and update the database connection string:
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/nested_tags_tree"
Replace user and password with PostgreSQL credentials.

Start the backend server:

Frontend Setup:
Open a new terminal window
Navigate to the project root directory

Install required npm packages:
npm install

Start the frontend development server:
npm start
Running the Application:

Open your web browser and go to http://localhost:3000
Nested Tags Tree application will run now


