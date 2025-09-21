Feature: SAP Dispute Case Management
  As an Accounts Receivable user
  I want to close a dispute case in SAP
  So that the case status is updated and reflected in the Closed section

  Background:
    Given the user navigates to the SAP URL
    When the user enters a valid username and password

  @sapCloseDisputeCase
  Scenario Outline: Close an existing dispute case
    When the user click on the Finance Tab
    And the user selects Manage Dispute Cases from the dashboard
    And the user enters Customer ID "<CustomerID>" and Company Code "<CompanyCode>"
    And the user searches and selects the dispute case from the results list
    And the user clicks on Edit in the case overview page
    And the user changes the status of the dispute case to Closed
    And the user clicks on the Save button
    And the user navigates back to Manage Dispute Cases
    And the user enters Customer ID "<CustomerID>" and Company Code "<CompanyCode>"
    Then the dispute case should appear under the Closed section

    Examples:
      | CustomerID | CompanyCode |
      | 17100001   | 1710        |
