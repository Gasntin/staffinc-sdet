Feature: User applies jobs location filter

  As a user,
  I want to use the location filter,
  So that I can find jobs in specific locations.

  Background:
  Given User on the jobs page with the URL "https://jobs.staffinc.co/"
  And User open all location jobs page

  Scenario: User applies a location filter and sees jobs in the selected location
    When User selects "Jawa Barat" as province and "Kota Bandung" as city
    And User applies the filter
    Then User should see job listings for "Kota Bandung" only
