Feature: Echo command

As a user I would like to chat with someone even when there is no-one
available. It would be nice if system would echo my messages when I
request it to do so.

Background:
  Given app is running

Scenario: User issues echo command
  Given that "Alice" is logged in
  When "Alice" sends following messages
    | message     |
    | !echo hello |
  Then "Alice" sees that System replied with "hello" message
