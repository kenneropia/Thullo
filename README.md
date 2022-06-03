# Thullo API readme

## Setting up

1. create a `.env` file at the root of the repo
2. set up your mongodb and add the url to **CLOUD_DB_URL**
3. JWT token and expiration date through **JWT_SECRET** and **JWT_EXPIRES_IN**
4. AWS S3 storage through **S3_ACCESS_KEY** and **S3_SECRET_ACCESS_KEY**
5. Setting up Mail testing with mailtrap is essential

## Links

Link to the [postman collection](https://www.postman.com/speeding-comet-566121/workspace/thullo/collection/14123497-bbf111ac-a7fe-40c8-ba06-daa735a20b77?action=share&creator=14123497)

## Actions

Thullo is a Trello Clone, with only the API functionality.

I can list of available boards
I can add a new board with a cover photo, title and visibility options
I can see a board with different columns, team members,... according to the design
I can add a new label
I can add a new card to the existing label
I can add a member to the board (user must exist in the system)
I can change the name of the board by selecting it
I can change/add the description of the board
Given I am an admin, I can remove members from the board
I can move a card from a column to another one by drag and drop
I can rename the title of a card
I can see which column the card belongs to
I can see and change the description
I can add new attachments and I can download and delete existing attachments
I can add a new comment. Given I am the author, I can edit and delete the comment.
I can change the card cover image
I can add labels with given colors to a card
