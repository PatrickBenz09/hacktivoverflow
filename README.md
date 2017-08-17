# hacktivoverflow

Question & Answer (Q&A) app

## REST API hacktivoverflow

List of user routes:

| Route                   | HTTP          | Description      |
| ----------------------- |:-------------:| :----------------|
| /user/login             |POST           | Login            |
| /user/register          |POST           | Register         |
| /user/register          |POST           | Show all users   |

List of question routes:

| Route                   | HTTP          | Description                              |
| ----------------------- |:-------------:| :----------------------------------------|
| /question               |GET            | Show all questions                       |
| /question/:id           |GET            | Show a specific question                 |
| /question               |POST           | Create a new question                    |
| /question/:id           |DELETE         | Delete a specific question               |
| /question/:id           |PUT            | Edit a specific question                 |
| /question/upvote/:id/   |PUT            | Up-vote a specific question              |
| /question/downvote/:id/ |PUT            | Down-vote a specific question            |
| /question/:id/answer/   |GET            | Show all answers of a specific question  |
| /question/:id/          |POST           | Create answer for a specific question    |


## How To Run

```bash
### server-side:

npm install

npm start

### client-side

cd client/

npm install

npm run dev
```
