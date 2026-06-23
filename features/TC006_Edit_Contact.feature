Feature: SAP Customer Contact Management
  As a Collections user
  I want to edit an existing customer contact in SAP
  So that updated visit details are recorded correctly

  Background:
    Given the user navigates to the SAP URL
    When the user enters a valid username and password

  @sapEditCustomerContact
  Scenario Outline: Edit customer contact details
    When the user searches for Manage Customer Contacts in the search bar
    And the user selects the Manage Customer Contacts option
    And the user enters Business Partner "<BusinessPartner>"
    And the user enters Collection Segment "<CollectionSegment>"
    And the user clicks the Go button
    And the user selects a finished customer contact from the list
    And the user clicks on the Edit button in the contact page
    And the user changes the contact type to "<ContactType>"
    And the user changes the date and time to "<hrs>" hrs and "<min>" pm
    And the user clicks on the Save button
   # Then the customer contact should be updated successfully with the new details

    Examples:
      | BusinessPartner | CollectionSegment | ContactType | hrs     | min   |
      | CACU_S01        | YT_SEGMT01        | 002 (Visit) | 11      | 19    |
