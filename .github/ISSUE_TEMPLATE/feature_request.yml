name: Feature Request
description: Suggest a new feature or improvement.
title: "[FEATURE] "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        Have an idea for NexPlay?
        Describe your proposal below.

  - type: textarea
    id: problem
    attributes:
      label: Problem / Motivation
      description: What problem does this feature solve?
      placeholder: I would like to...
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: Describe how you envision this feature working.
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Have you considered alternative solutions?
    validations:
      required: false

  - type: dropdown
    id: component
    attributes:
      label: Component
      description: Which part of NexPlay does this concern?
      multiple: true
      options:
        - Frontend
        - Backend
        - Game Client
        - Game Server
        - Infrastructure / DevOps
        - Documentation
        - Other
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Add screenshots, mockups or other relevant information.
    validations:
      required: false
