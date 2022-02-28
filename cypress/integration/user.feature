Feature: User profile page

    Viewing a user's profile

    Scenario: Navigating to a user's page and check name
        Given I open "home" page
        Then I see "eddiejaoude" as a link
        When I click on "eddiejaoude"
        Then I should see "eddiejaoude" in the url
        And I see "Eddie Jaoude" text in section "h1"

    Scenario: Going directly to a user's profile
        Given I open "eddiejaoude" page
        Then I should see "eddiejaoude" in the url
        And I see "Eddie Jaoude" text in section "h1"

    Scenario: Check links appear on user profile
        Given I open "eddiejaoude" page
        Then I see "Follow me on GitHub" text in section "a"
        And I see "Follow me on Twitter" text in section "a"
