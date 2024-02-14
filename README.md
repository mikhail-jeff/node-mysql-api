Node JS CRUD REST API with Express, Sequelize ORM and MySQL

Database Table Setup (employees - id, name, email, gender, mobile)

API LIST - CRUD

- ADD employee API
- GET ALL employee API
- GET SINGLE employee API
- UPDATE employee API
- DELETE employee API

# execute sequelize

npx sequelize

# create model

npx sequelize model:create --name Employee --attributes name:string,email:string,gender:enum,mobile:string

# run migration and create table

npx sequelize db:migrate
