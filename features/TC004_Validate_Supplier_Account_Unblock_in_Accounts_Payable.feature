Feature: SAP Supplier Management
  As an Accounts Payable user
  I want to unblock a supplier in SAP
  So that the supplier can receive payments again

  Background:
    Given the user navigates to the SAP URL
    When the user enters a valid username and password

  @sapUnblockSupplier
  Scenario Outline: Unblock a supplier currently blocked for payment
    When the user click on the Finance Tab
    And the user selects Manage Payment Blocks from the dashboard
    And the user enters Supplier ID "<SupplierID>"
    And the user enters Company Code "<CompanyCode>"
    And the user selects Status "Account Blocked" from the drop-down
    And the user clicks on the Go button to fetch results
    And the user clicks on the "<SupplierID>" record hyperlink
    And the user clicks on the Unblock Supplier button on the supplier detail page
    Then the supplier should be unblocked and a confirmation Toast message should be displayed

    Examples:
      | SupplierID | CompanyCode |
      | 17100088    | 1710        |
