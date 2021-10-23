Feature: Search

    Saerch all users

    Scenario: Search on the homepage
        Given I open "home" page
        And I see ".search-section" item on the page

    Scenario: Search with results
        Given I open "home" page
        Then I see "Eddie Jaoude" text in section "main"
        And I see "Kunal Verma" text in section "main"
        When I type "Eddie Jaoude" in ".search-section input"
        Then I see "Eddie Jaoude" text in section "main"
        And I do not see "Kunal Verma" text in section "main"
