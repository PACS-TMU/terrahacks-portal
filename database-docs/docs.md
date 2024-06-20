# DOCS ON HOW TO USE THE TERRAHACKS DATABASE

List of Tables in Database
1. public.accepted_apps
2. public.accommodations
3. public.admin
4. public.applicant_details
5. public.applications
6. public.meals
7. public.questions
8. public.rejected_apps
9. public.responses
10. public.tmu_students
11. public.users
12. auth.users
13. public.account_deletions <mark>Not Implemented </mark>
14. public.app_deletions <mark>Not Implemented </mark>

List of Triggers in Database
1. on_application_submitted
2. on_auth_user_created
3. on_auth_user_deleted
4. meals_on_rsvp <mark>Not Implemented </mark>
5. meals_on_rsvp_remove <mark>Not Implemented </mark>
6. user_app_removal <mark>Not Implemented </mark> 


# Scenarios

## 1. Adding User to Database
  To add a user three tables are used `auth.users`, `public.users`, and `public.meals`. Upon account creation:
  - Auth creates and validates a user
  - User info is also automatically pushed to the user table using the `on_auth_user_created` trigger

## 2. User requests to delete account from Database <mark>Not Implemented </mark> <mark>TO BE CHANGED </mark>
Upon deletion request we Auth removes all user data from `auth.users` and related tables. Additionally the trigger `on_auth_user_deleted` deletes all information related to user from `public.users`, `public.applications`, `public.applicant_details`, `public.meals`, `public.responses`, `public.tmu_students`, `public.rejected`, `public.accepted_apps`, `public.accommodations` then updates a table called `public.account_deletions` with the account_id of the user and the time of account deletion.

## 3. User Applies to Hackathon.
  When a user applies six tables are used if necessary `public.applications`, `public.applicant_details`, `public.accommodations`, `public.responses`, `public.tmu_students`, `public.questions'. To add a user first insert a row inputting the users account_id into `public.applications` to create an application_id for that users as it will be needed for the following tables all. using the newly generated application_id all fourm data can be inputted into their respective fields.

### Table showing `public.applications` data mapping
| Fourm Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Auto Generated upon row creation (Save for future row insertions and not on Form)
| - | account_id | Take current user account_id (The only thing needed to insert a row) 


### Table showing `public.application_details` data mapping
| Fourm Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Taken from applications table (Not on form) 
| - |  account_id | Take current user account id (Not shown on forum)
| Gender | gender | Drop down of options with other
| Pronouns | pronouns | Drop down of options with other
| Race | race | Drop down of options with other
| Sexual Orientation | sexuality | Drop down of options with other
| Field of Study | field_of_study | Drop down of options with other
| Phone | phone_number | Text to input
| School | school | Drop down of options with other to input custom name
| Current Education Level | level_of_study | Drop down of options with other
| Current/Anticipated Graduation Year| grad_year | Drop down of options
| City | city | Drop down of options only support US and CA, Other to input custom info
| Providence/State | province_state | Drop down of options only support US and CA, Other to input custom info
| Country | country | Drop down of options only support US and CA, Other to input custom info
| Are You a TMU Student | tmu_student | Boolean if yes ask for student number 
| Would You need Accommodation of any Kind | accommodation | Boolean if yes allow text to record accommodations

### Table showing `public.tmu_students` data mapping
| Fourm Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Take application_id created from the application table using account_id (Not shown on form)
| - |account_id | Take current user account_id
| Student Number | student_num | Text inputted by User
| Student School Email | email | Text inputted by User with proper valadiations 

### Table showing `public.responses` data mapping
| Fourm Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Taken from applications table (Not on form) 
| - | account_id | Take current user account id (Not shown on forum)
| - | question_id | Taken from `public.questions` each question has associated id (Not shown on form)
| Response| response | Text inputted by user for respective question

### Table showing `public.accommodations` data mapping
| Fourm Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| -  | application_id | Taken from applications table (Not on form) 
| -  | account_id | Take current user account id (Not shown on forum)
| Accommodation Details  | description | Text inputted by user

## 4. User Rescinds application. <mark>Not Implemented </mark>
Upon removal request the user's application is deleted from `public.applications`. Upon deletion, the trigger `user_app_removal` will run if meals were assigned in the `public.meals` table will be removed followed by all related data from the tables `public.tmu_students`, `public.responses`, `public.application_details`, `public.accommodations`, then a table called `public.app_deletions` will be updated with the account_id of the user, the appliation_id and the datetime the application was deleted.

## 5. User Gets Accepted into Hackathon

## 6. User Gets Rejected from Hackathon

## 7. Accepted User RSVPS for Hackathon

## 8. RSVPed User UnRSVPs







