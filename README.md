# getir-test-case 

This project is a project that can bring the records between the dates and between the minimum and maximum numbers using the post method.

Project link on heroku : [https://getir-backend-test-case.herokuapp.com/](https://getir-backend-test-case.herokuapp.com/)

This project was generated with NodeJS and express module.

## Table Content 

- Quick Start
- API 
- Test
- Error Codes
- Creators

## Quick Start

`npm install` <br>

Run `npm start` for a server. Navigate to `http://localhost:3000/`.



## API

```markdown
Request Method : POST 
Request URL: https://getir-backend-test-case.herokuapp.com/
```
[https://getir-backend-test-case.herokuapp.com/](https://getir-backend-test-case.herokuapp.com/)

| Param Name | Description | Is Require | Format |
| ------------ | ----------- | ---------- | ------ |
| startDate | Filter Start Date| Require | YYYY-MM-DD |
| endDate | Filter End Date | Require | YYYY-MM-DD |
| minCount | Minimum Number | Require |
| maxCount | Maximum Number | Require |


<hr>

```markdown
Request Method : POST 
Request URL: https://getir-backend-test-case.herokuapp.com/group
```
This api will group records that you already filtered if key and date is same.

[https://getir-backend-test-case.herokuapp.com/group](https://getir-backend-test-case.herokuapp.com/group)

| Param Name | Description | Is Require | Format |
| ------------ | ----------- | ---------- | ------ |
| startDate | Filter Start Date| Require | YYYY-MM-DD |
| endDate | Filter End Date | Require | YYYY-MM-DD |
| minCount | Minimum Number | Require |
| maxCount | Maximum Number | Require |

## Test
This project uses mocha test framework.

There is 5 test case in this test class.
 - GET check index page
 - POST check all params work correctly and returning data
 - POST check worong date format 
 - POST check wrong number format
 - POST check max number is bigger
 
 First you need to install dependency with:
 
 `npm install` 
 
 Then you can run test with this command `npm test` . Then you will get result like picture in below.
 
 ![https://i.hizliresim.com/bhRz6x.png](https://i.hizliresim.com/bhRz6x.png)
 
## Error Codes

| Error Code | Description |  
| ------------ | ----------- | 
| 1 | MongoDB error | 
| 2 | Check min and max numbers !! | 
| 3 | Check Date Format It should be (YYYY-MM-DD) !! |  
| 4 | Please use the post method |  

## Creators

**Ramazan Kaya**
