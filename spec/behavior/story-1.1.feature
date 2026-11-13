Feature: Upgrade to Premium button with Premium details modal
  As a Standard subscriber
  I want an "Upgrade to Premium" button on my Plan and Billing page
  So that I can learn about the Premium tier without leaving the page

  Background:
    Given a user "tpg@example.com" is signed in

  @AC-1
  Scenario: Button is shown for an active Standard plan
    Given "tpg@example.com" has an active "Standard" plan at "$20/month"
    When the user opens the Plan and Billing page
    Then an "Upgrade to Premium" button is shown next to the current plan and price
    And the button uses the primary button style

  @AC-1
  Scenario: Button is hidden when the user has no active plan
    Given "tpg@example.com" has no active plan
    When the user opens the Plan and Billing page
    Then the "Activate Standard plan" button is shown
    And no "Upgrade to Premium" button is shown

  @AC-1
  Scenario: Button is hidden while billing data is loading
    Given the billing data has not finished loading
    When the user opens the Plan and Billing page
    Then the text "Loading billing..." is shown
    And no "Upgrade to Premium" button is shown

  @AC-2
  Scenario: Opening the Premium details modal
    Given "tpg@example.com" has an active "Standard" plan at "$20/month"
    And the user is on the Plan and Billing page
    When the user activates the "Upgrade to Premium" button
    Then a modal dialog named "Upgrade to Premium" is open
    And focus is inside the dialog
    And the dialog shows the price "$30/month"
    And the dialog shows "Ultra HD (4K)"
    And the dialog shows "Watch on 4 devices at once"
    And the dialog shows "Download on 6 devices"
    And the dialog shows "Ad-free streaming"
    And the dialog shows "Spatial audio"

  @AC-2
  Scenario: Opening the modal with the keyboard
    Given "tpg@example.com" has an active "Standard" plan at "$20/month"
    And the "Upgrade to Premium" button has keyboard focus
    When the user presses "Enter"
    Then a modal dialog named "Upgrade to Premium" is open

  @AC-3
  Scenario: Continue shows the coming-soon message and keeps Standard
    Given the "Upgrade to Premium" modal is open
    When the user chooses "Continue"
    Then the modal is closed
    And the message "Premium upgrades are coming soon" is shown
    And the current plan still shows "Standard"

  @AC-4
  Scenario: Cancel dismisses the modal without changes
    Given the "Upgrade to Premium" modal is open
    When the user chooses "Cancel"
    Then the modal is closed
    And focus is on the "Upgrade to Premium" button
    And the message "Premium upgrades are coming soon" is not shown

  @AC-4
  Scenario: Close control dismisses the modal without changes
    Given the "Upgrade to Premium" modal is open
    When the user chooses the close control labelled "Close"
    Then the modal is closed
    And focus is on the "Upgrade to Premium" button
    And the message "Premium upgrades are coming soon" is not shown

  @AC-4
  Scenario: Escape key dismisses the modal without changes
    Given the "Upgrade to Premium" modal is open
    When the user presses "Escape"
    Then the modal is closed
    And focus is on the "Upgrade to Premium" button
    And the message "Premium upgrades are coming soon" is not shown

  @AC-5
  Scenario: The upgrade flow makes no network request
    Given "tpg@example.com" has an active "Standard" plan at "$20/month"
    And the Plan and Billing page has finished loading
    When the user opens the modal, chooses "Continue", reopens it and presses "Escape"
    Then no additional network request is made after the page finished loading
