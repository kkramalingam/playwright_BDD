Feature: SAP Create and Verify Customer Contact
  As an Accounts Receivable user
  I want to create and verify a customer contact in SAP
  So that the contact is recorded for the business partner
 
  Background:
    Given the user navigates to the SAP URL
    When the user enters a valid username and password
 
  @sapCreateCustomerContact
  Scenario Outline: Create and verify customer contact for a business partner
    When the user click on the Finance Tab
    And the user selects Process Receivables tile from the dashboard
    And the user enters Business Partner "<BusinessPartner>"
    And the user enters Collection Segment "<CollectionSegment>"
    And the user enters Company Code "<CompanyCode>"
    And the user clicks the Go button
    And the user selects the Business Partner link from the results
    And the user clicks on Create Customer Contact
    And the user selects Result of Contact "<ResultOfContact>"
    And the user enters Contact Person Name "<ContactPersonName>"
    And the user clicks on Create button in Contact Page
    # Then the customer contact should be created and visible under the customer contacts list
 
    Examples:
      | BusinessPartner        | CollectionSegment | CompanyCode        | ResultOfContact           | ContactPersonName |
      | CACU_S01               | YT_SEGMT01        | 1710               | 002 (Customer Not Reached) | Babu          |