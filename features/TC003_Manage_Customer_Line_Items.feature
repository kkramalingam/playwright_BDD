Feature: SAP Edit Customer Line Items in Accounts Receivable

  As an Accounts Receivable user

  I want to edit customer line items in SAP

  So that the changes are saved and reflected in the system
 
  Background:

    Given the user navigates to the SAP URL

    When the user enters a valid username and password
 
  @sapEditCustomerLineItems

  Scenario Outline: Edit an existing customer line item

    When the user click on the Finance Tab

    And the user selects Manage Customer Line Items from the dashboard

    And the user enters Customer ID "<CustomerID>" and Company Code "<CompanyCode>" in Manage Customer Line Page

    And the user selects Status "<Status>"

    And the user selects Open on Key Date as "<KeyDate>"

    And the user clicks the Go button to fetch records

    Then the system should display the corresponding customer line items

    When the user selects a customer line item

    And the user clicks on Edit Line Items

    And the user updates the field FieldName with value NewValue

    And the user saves the changes

    Then the edited field FieldName should be updated with value NewValue
 
    Examples:

      | CustomerID | CompanyCode | Status     | KeyDate |

      | 17100001   | 1710        | Open Items | Today   | 

 