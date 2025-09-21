Feature: SAP Create Dispute Case
  As an Accounts Receivable user
  I want to create a new dispute case in SAP
  So that disputes are logged with the correct details for resolution
 
  Background:
    Given the user navigates to the SAP URL
    When the user enters a valid username and password
 
  @sapCreateDisputeCase
  Scenario Outline: Create a new dispute case
    When the user click on the Finance Tab
    And the user selects Manage Dispute Cases from the dashboard
    And the user clicks on the Create button to initiate a new dispute case
    And the user selects Customer ID "<CustomerID>" in the pop-up
    And the user clicks on the Create button
    And the user enters Case Title "<CaseTitle>"
    And the user selects Category "<Category>"
    And the user sets Priority "<Priority>"
    And the user selects Reason "<Reason>"
    And the user enters Root Cause "<RootCause>"
    And the user clicks on Create button
    Then the dispute case should be created successfully
 
    Examples:
      | CustomerID | CaseTitle                                | Category          | Priority | Reason              | RootCause        |
      | 17100003   | Dispute on Invoice #900123 – Overcharge Issue | 0001 (Financial) | High     | 0007 (Pricing Issue) | 0002 (Wrong price) |