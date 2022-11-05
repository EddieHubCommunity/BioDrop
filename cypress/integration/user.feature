Feature: User profile page

    Viewing a user's profile

    Scenario: Navigating to a user's page and check name
        Given I open "home" page
        Then I should see "Profiles 🔎" text in the section "p"
        When I click on "search"
        Then I should see "search" in the url

    Scenario: Going directly to a user's profile
        Given I open "eddiejaoude" page
        Then I should see "eddiejaoude" in the url
        And I see "Eddie Jaoude" text in section "h1"

    Scenario: Check links appear on user profile
        Given I open "eddiejaoude" page
        Then I see "Follow my Open Source on GitHub" text in section "a"
        And I see "Follow me on Twitter" text in section "a"
