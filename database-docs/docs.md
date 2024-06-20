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
15. public.waitlisted_apps <mark>Not Implemented </mark>
16. public.team_data <mark>Not Implemented </mark>
17. public.user_teams <mark>Not Implemented </mark>

List of Triggers in Database
1. on_application_submitted
2. on_auth_user_created
3. on_auth_user_deleted
4. meals_on_rsvp <mark>Not Implemented </mark>
5. meals_on_rsvp_remove <mark>Not Implemented </mark>
6. user_app_removal <mark>Not Implemented </mark> 


# Scenarios

## 1. Adding User to Database
  This uses three tables `auth.users`, `public.users`, and `public.meals`. Upon account creation:
  - Auth creates and validates a user
  - User info is also automatically pushed to the user table using the `on_auth_user_created` trigger

## 2. User requests to delete account from Database <mark>Not Implemented </mark> <mark>TO BE CHANGED </mark>
Upon deletion request:
- Auth removes all user data from `auth.users` and related tables. 
- The trigger `on_auth_user_deleted` deletes all information related to user from `public.users`, `public.applications`, `public.applicant_details`, `public.meals`, `public.responses`, `public.tmu_students`, `public.rejected`, `public.accepted_apps`, `public.accommodations`
- Then updates a table called `public.account_deletions` with the account_id of the user and the time of account deletion.

## 3. User Applies to Hackathon.
Six tables are used if necessary `public.applications`, `public.applicant_details`, `public.accommodations`, `public.responses`, `public.tmu_students`, `public.questions`. 
  - To add a user first insert a row inputting the users account_id into `public.applications` to create an application_id for that users as it will be needed for the following tables all.
  - Using the newly generated application_id all fourm data can be inputted into their respective fields.
  - Data is only added to the tables `public.accommodations`, `public.tmu_students` if they first say yes to the columns `tmu_student` or `accommodation` from `public.application_details`.
  - The columns `rsvp` from `public.applcations` and `tmu_student`, `accommodation` from `public.application_details` are set false by default if no entry is given.

### Table showing `public.applications` data mapping
| Fourm Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Auto Generated upon row creation (Save for future row insertions and not on Form)
| - | account_id | Take current user account_id (The only thing needed to insert a row) 


### Table showing `public.application_details` data mapping
| Form Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Taken from applications table (Not on form) 
| - |  account_id | Take current user account id (Not shown on form)
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
| Province/State | province_state | Drop down of options only support US and CA, Other to input custom info
| Country | country | Drop down of options only support US and CA, Other to input custom info
| Are You a TMU Student | tmu_student | Boolean if yes ask for student number 
| Would You need Accommodation of any Kind | accommodation | Boolean if yes allow text to record accommodations

### Table showing `public.tmu_students` data mapping
| Form Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Take application_id created from the application table using account_id (Not shown on form)
| - |account_id | Take current user account_id
| Student Number | student_num | Text inputted by User
| Student School Email | email | Text inputted by User with proper valadiations 

### Table showing `public.responses` data mapping
| Form Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| - | application_id | Taken from applications table (Not on form) 
| - | account_id | Take current user account id (Not shown on form)
| - | question_id | Taken from `public.questions` each question has associated id (Not shown on form)
| Response| response | Text inputted by user for respective question

### Table showing `public.accommodations` data mapping
| Form Data | Column Name | Description |
| ----------- | ----------- | ----------- |
| -  | application_id | Taken from applications table (Not on form) 
| -  | account_id | Take current user account id (Not shown on form)
| Accommodation Details  | description | Text inputted by user

## 4. User Rescinds application. <mark>Not Implemented </mark>
Upon removal request the user's application is deleted from `public.applications`.
- The trigger `user_app_removal` will run if meals were assigned in the `public.meals` table will be removed followed by all related data from the tables `public.tmu_students`, `public.responses`, `public.application_details`, `public.accommodations`.
- A table called `public.app_deletions` will be updated with the account_id of the user, the appliation_id and the datetime the application was deleted.

## 5. User Gets Accepted into Hackathon
Two tables are used in this process `public.applications` and `public.accepted_apps`
- After an admin reviews an application they will enter the `application_id` and `account_id` of the user to the `public.accepted_apps` table.
- The status column of the `public.applications` table is also updated to enum type `Accepted`
- The option to RSVP may now be displayed

## 6. User Gets Rejected from Hackathon
Two tables are used in this process `public.applications` and `public.rejected_apps`
- After an **admin** reviews an application they will enter the `application_id` and `account_id` of the user to the `public.rejected_apps` table.
- The status column of the `public.applications` table is also updated to enum type `Rejected`
  
## 7. User Gets Waitlisted from Hackathon <mark>Not Implemented </mark>
Two tables are used in this process `public.applications` and `public.waitlisted_apps`
-After an admin reviews an application they will enter the `application_id` and `account_id` of the user to the `public.waitlisted_apps` table.
- The status column of the `public.applications` table is also updated to enum type `Waitlisted`
  
## 8. Accepted User RSVPS for Hackathon <mark>Not Implemented </mark>
Two tables are used in this process `public.applications` and `public.meals`
- If a user clicks the RSVP button once their application is accepted it will update the `rsvp` column to the enum type `True`.
- This then activates the trigger `meals_on_rsvp` which adds 5 meals for the user.
  
## 9. RSVPed User UnRSVPs <mark>Not Implemented </mark>
Two tables are used in this process `public.applications` and `public.meals`
- If a user clicks the RSVP button once their application is accepted it will update the `rsvp` column to the enum type `recinded`.
- This then activates the trigger `meals_on_rsvp_remove` which adds 5 meals for the user.
- 
## 10. Users Create Team

## 11. User adds team members <mark>Not Implemented </mark>

## 12. User checks in <mark>Not Implemented </mark>

## 13. User Collects a meal <mark>Not Implemented </mark>

# RLS Policies 





