name: Bug Report
description: Report unexpected behavior or a bug.
title: "[BUG] "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug!
        Please provide as much information as possible.

  - type: textarea
    id: description
    attributes:
      label: Description
      description: Clearly describe the bug.
      placeholder: What happened?
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      description: How can we reproduce this issue?
      placeholder: |
        1. Start the application
        2. Navigate to ...
        3. Click on ...
        4. Observe the error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should happen instead?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happens?
    validations:
      required: true

  - type: dropdown
    id: environment
    attributes:
      label: Environment
      description: Where does the issue occur?
      options:
        - Development
        - Production
        - Both
    validations:
      required: true

  - type: textarea
    id: logs
    attributes:
      label: Logs / Screenshots
      description: Add relevant logs, screenshots or error messages.
      render: shell
    validations:
      required: false
