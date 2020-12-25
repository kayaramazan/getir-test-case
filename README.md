# getir-test-case 

This project is a project that can bring the records between the dates and between the minimum and maximum numbers using the post method.

This project was generated with NodeJS and express module.

## Table Content 

- Quick Start
- API 
- Test
- Creators

## Quick Start
`npm install` <br>

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



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

## Test
This project uses mocha test framework.
There is 5 test case in this test class.
 - GET check index page
 - POST check all params work correctly and returning data
 - POST check worong date format 
 - POST check wrong number format
 - POST check max number is bigger
 
 You can run test with this command `npm test` . Then you will get result like picture in below.
 
 ![Image](https://hizliresim.com/bhRz6x)
 
 
 
## Creators

**Ramazan Kaya**
