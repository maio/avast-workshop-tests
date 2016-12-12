Feature: Chat

Our users would like to chat together. When someone posts message
everyone else should be able to read it.

Background:
  Given app is running

Scenario: Messages posted by a user are visible to everyone
  Given that "Alice" is logged in
  And that "Bob" is logged in
  When "Alice" sends following messages
    | message |
    | hello   |
  Then "Bob" sees following messages
    | message | author |
    | hello   | Alice  |
  And "Alice" sees following messages
    | message | author |
    | hello   | Alice  |
