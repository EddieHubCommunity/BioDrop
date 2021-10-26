Feature: Page not found

    Check error messages are displayed

    Scenario: Error 404 page
        Given I open "404" page
        And I see "Contribute on" text in section "footer"
        And I see "Profile not found" text in section "main"
        And I do not see "Search" text in section "main"
