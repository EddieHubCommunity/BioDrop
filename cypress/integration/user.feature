Feature: User profile page

    Viewing a user's profile

    Scenario: Navigating to a user's page
        Given I open "home" page
        Then I see "eddiejaoude" as a link
        When I click on "eddiejaoude"
        Then I should see "eddiejaoude" in the url
        And I see "Eddie Jaoude" in "h1"
