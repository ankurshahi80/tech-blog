 # tech-blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description

A CMS-style blog site where developers can publish their blog posts and comment on other developers’ posts as well.

## Table of Contents
 * [Website](#website)
 * [Installation](#installation)
 * [Contributing](#contributing)
 * [Screenshots](#screenshots)
 * [Questions](#questions)
 * [License](#license)

## Website 

**URL**: https://techblogas.herokuapp.com/

**Sample Login Credentials**:
- **Email**: lernantino
- **Password**: password1234


## Installation
  1. Clone the files from the repository onto your local machine
  2. Navigate to the directory of the cloned repository in your terminal.
  3. Create a file called  `.env`  in the root folder and add the code:
  
         DB_NAME = 'coworkers_db'
        
         DB_USER = 'your-mysql-username'
         
         DB_PW = 'your-mysql-password'
  4. In your terminal, type  `npm install`  to install the npm modules
  5. Make sure you have MySQL installed on your system
  6. Go to MySQL shell by typing  `mysql -u root -p`  
  7. In MySQL shell, type  `source db/schema.sql;`  to run the file
  8. Then type  `quit;`  to quit the MySQL shell
  9. In your terminal, run the app by typing:  `npm start`

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)

## Screenshots

<img width="1190" alt="Screen Shot 2021-08-02 at 2 21 27 AM" src="https://user-images.githubusercontent.com/79622822/127813242-c8b56b3a-3ab9-492d-a680-bcc754a5996c.png">

## Questions

Got questions? Check out my github profile: [ankurshahi80](https://github.com/ankurshahi80)
or reach me at shahiankur80@gmail.com with your queries.

## License
MIT

