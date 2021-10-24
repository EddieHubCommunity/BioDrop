Feature: Homepage

    Loading all users

    Scenario: Opening the homepage
        Given I open "home" page
        And I see "Contribute on" text in section "footer"
