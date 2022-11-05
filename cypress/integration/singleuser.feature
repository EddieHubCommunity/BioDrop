Feature: Single user page

    Loading on single user mode

    Scenario: Opening user page
        Given I use single user mode with "eddiejaoude"
        Given I open "home" page
        And I see "Eddie Jaoude" text in section "h1"
        Then I change back to regular mode
